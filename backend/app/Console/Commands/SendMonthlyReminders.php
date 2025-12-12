<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\MonthlyDonationReminder;
use Carbon\Carbon;

class SendMonthlyReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'donations:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send monthly reminder emails to donors who have not donated in the last 30 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Finding donors requiring reminders...');

        // Logic: Find users/donors whose LAST donation was > 30 days ago.
        // This is a simplified logic. In a real app, we'd need a robust way to track last reminder sent to avoid spamming.
        // For MVP: Find donors who donated exactly 30 days ago and haven't donated since.
        
        $thirtyDaysAgo = Carbon::now()->subDays(30)->startOfDay();
        $thirtyDaysAgoEnd = Carbon::now()->subDays(30)->endOfDay();

        // Find donations made on that day
        $donations = Donation::whereBetween('created_at', [$thirtyDaysAgo, $thirtyDaysAgoEnd])
                             ->whereNotNull('donor_id')
                             ->get();
        
        $count = 0;
        foreach ($donations as $donation) {
            $donor = $donation->donor; // Assuming relationship exists
            
            if (!$donor) continue;

            // Check if they have made a more recent donation
            $recentDonation = Donation::where('donor_id', $donor->id)
                                      ->where('created_at', '>', $thirtyDaysAgoEnd)
                                      ->exists();
            
            if (!$recentDonation) {
                // Send Reminder
                Mail::to($donor->email)->later(now()->addSeconds($count * 5), new MonthlyDonationReminder($donor));
                $this->info("Queued reminder for: {$donor->email}");
                $count++;
            }
        }

        $this->info("Successfully queued {$count} reminder emails.");
    }
}

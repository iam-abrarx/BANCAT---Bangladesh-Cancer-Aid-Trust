<!DOCTYPE html>
<html>
<head>
    <title>Donation Receipt</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #E91E63;">Thank You for Your Donation!</h2>
        <p>Dear {{ $donation->donor_name ?? 'Donor' }},</p>
        
        <p>We have successfully received your donation. Your support helps us provide critical care to cancer patients in Bangladesh.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Transaction ID:</strong> {{ $donation->transaction_id }}</p>
            <p><strong>Amount:</strong> ৳{{ number_format($donation->amount, 2) }}</p>
            <p><strong>Date:</strong> {{ $donation->created_at->format('F d, Y') }}</p>
            @if($donation->patient)
                <p><strong>Campaign/Patient:</strong> {{ $donation->patient->name_en }}</p>
            @endif
        </div>

        <p>Your generosity makes a real difference.</p>
        
        <p>Sincerely,<br>
        The BANcat Team</p>
    </div>
</body>
</html>

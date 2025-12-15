<!DOCTYPE html>
<html>
<head>
    <title>We Miss You</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #E91E63;">Your Impact Matters</h2>
        <p>Dear {{ $donor->name ?? 'Friend' }},</p>
        
        <p>It's been a while since your last donation. We wanted to reach out and say thank you for your past support.</p>
        
        <p>There are still many cancer patients in Bangladesh who need urgent assistance. Your contribution, no matter the size, helps save lives.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ env('FRONTEND_URL', 'http://localhost:5173') }}/campaigns" style="background-color: #E91E63; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Donate Again</a>
        </div>

        <p>Thank you for being part of our community.</p>
        
        <p>Sincerely,<br>
        The BANcat Team</p>
    </div>
</body>
</html>

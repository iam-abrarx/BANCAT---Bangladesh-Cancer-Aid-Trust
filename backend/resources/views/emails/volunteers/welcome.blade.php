<!DOCTYPE html>
<html>
<head>
    <title>Welcome Volunteer</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #009688;">Welcome to BANcat!</h2>
        <p>Dear {{ $volunteer->name }},</p>
        
        <p>Thank you for applying to volunteer with us. We have received your application.</p>
        
        <p><strong>Skills Listed:</strong> {{ implode(', ', $volunteer->skills ?? []) }}</p>
        
        <p>Our team will review your application and get back to you shortly regarding the next steps.</p>
        
        <p>Together, we can fight cancer.</p>
        
        <p>Best Regards,<br>
        The BANcat Team</p>
    </div>
</body>
</html>

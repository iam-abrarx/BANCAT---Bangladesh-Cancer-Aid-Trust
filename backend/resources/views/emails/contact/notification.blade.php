<!DOCTYPE html>
<html>
<head>
    <title>New Contact Inquiry</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        
        <p><strong>Name:</strong> {{ $contact->name }}</p>
        <p><strong>Email:</strong> {{ $contact->email }}</p>
        <p><strong>Subject:</strong> {{ $contact->subject ?? 'N/A' }}</p>
        
        <div style="border-left: 4px solid #ddd; padding-left: 15px; margin: 20px 0;">
            <p>{{ $contact->message }}</p>
        </div>
        
        <p><small>Received via BANcat Website</small></p>
    </div>
</body>
</html>

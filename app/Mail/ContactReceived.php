<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\ContactMessage;

// This mailable class works as a "notification" that a user has submitted an email in our contact form
class ContactReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contact) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CONTACTO: ' . [$this->contact->subject],
            replyTo: [$this->contact->email], // user's email in the contact form
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact.received', // Our markdown email structure, which is filled with our $contact's data
            with: [
                'contact' => $this->contact,
            ],
        );
    }
}

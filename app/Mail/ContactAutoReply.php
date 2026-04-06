<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use App\Models\ContactMessage;

// Auto reply to users who use the contact form
class ContactAutoReply extends Mailable
{
   public function __construct(public ContactMessage $contact) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Seu pedido de contacto foi recebido.',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact.auto_reply',
            with: [
                'contact' => $this->contact,
            ],
        );
    }
}

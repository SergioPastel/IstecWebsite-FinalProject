<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Application;

// Auto reply for applicants
class ApplicationAutoReply extends Mailable
{
    public function __construct(public $application) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Candidatura recebida',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.application.auto_reply',
            with: [
                'application' => $this->application,
            ],
        );
    }
}

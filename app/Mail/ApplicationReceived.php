<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Application;
use Illuminate\Mail\Mailables\Attachment;

// Emails sent to staff with course applications
class ApplicationReceived extends Mailable
{
    public function __construct(public Application $application) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CANDIDATURA: ' . [$this->application->name] . '(' . [$this->application->course->title] . ')',
            replyTo: [$this->application->email], // replies to the emails applicant
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.application.received',
            with: [
                'application' => $this->application,
            ],
        );
    }

    public function attachments(): array
    {
        if (!$this->application->cv_path) {
            return [];
        }

        return [
            Attachment::fromStorage($this->application->cv_path)
                ->as([$this->application->name] . ' CV.pdf'),
        ];
    }
}

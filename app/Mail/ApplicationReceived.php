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
    public function __construct(
        // We pass the CV content, mime type and name as separate parameters because we don't want to store the CV file in our storage, but we want to attach it directly from the uploaded file content
        public Application $application,
        public ?string $cvContent = null,
        public ?string $cvMime = null,
        public ?string $cvName = null
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CANDIDATURA: ' . $this->application->full_name . ' (' . $this->application->course->title . ')',
            replyTo: $this->application->email, // replies to the emails applicant
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
        if ($this->cvContent) {
            return [
                // Attach the CV file directly from the uploaded content without storing it
                Attachment::fromData(
                    // Use a closure to provide the content when the email is being sent
                    // This allows us to avoid loading the file content into memory until it's actually 
                    // needed for sending the email
                    fn () => $this->cvContent,
                    $this->cvName ?? 'CV.pdf',
                    ['mime' => $this->cvMime]
                )
            ];
        }

        return [];
    }
}

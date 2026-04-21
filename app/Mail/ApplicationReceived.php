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
        public $application,
        public ?Array $files = null
    ) {}

    public function envelope(): Envelope
    {
        $subject = 'CANDIDATURA: ' . $this->application->full_name;

        if ($this->application->course) {
            $subject .= ' (Curso: ' . $this->application->course->title . ' #' . $this->application->course->id . ')';
        }

        if ($this->application->event) {
            $subject .= ' (Evento: ' . $this->application->event->name . ' #' . $this->application->event->id . ')';
        }

        return new Envelope(
            subject: $subject,
            replyTo: [$this->application->email],
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
        $attachments = [];

        // Handle file attachments if they exist
        foreach ($this->files ?? [] as $file) { 
            $attachments[] = Attachment::fromPath( // this is a workaround to attach files without storing them by creating temporary files
                $file->getRealPath()
            )->as($file->getClientOriginalName())
            ->withMime($file->getMimeType());
        }

        return $attachments;
    }
}

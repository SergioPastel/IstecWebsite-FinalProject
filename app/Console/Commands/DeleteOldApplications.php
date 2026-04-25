<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Application;
use App\Models\EventApplication;
use Carbon\Carbon;

// This is a scheduled command that will be run daily to soft delete applications and event applications 
//older than 3 months. This is to follow RGPD guidelines and ensure we are not keeping personal data longer than necessary.
class DeleteOldApplications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'applications:delete-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Soft delete applications and event applications older than 3 months';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $threeMonthsAgo = Carbon::now()->subMonths(3);

        // Anonymize personal data for applications older than 3 months
        Application::where('created_at', '<', $threeMonthsAgo)
            ->update([
                'full_name' => '*****',
                'email' => '*****',
                'phone' => '*****',
                'birth_date' => null, // Set to null since it's a date field
            ]);

        // Anonymize personal data for event applications older than 3 months
        EventApplication::where('created_at', '<', $threeMonthsAgo)
            ->update([
                'full_name' => '*****',
                'email' => '*****',
                'phone' => '*****',
                'identification_number' => null,
            ]);

        $applicationsDeleted = Application::where('created_at', '<', $threeMonthsAgo)->delete();
        $eventApplicationsDeleted = EventApplication::where('created_at', '<', $threeMonthsAgo)->delete();

        $this->info("Anonymized and soft deleted {$applicationsDeleted} applications and {$eventApplicationsDeleted} event applications older than 3 months.");
    }
}
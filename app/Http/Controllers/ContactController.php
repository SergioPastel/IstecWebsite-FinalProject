<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Http\Requests\StoreContactRequest; // Validation layer
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactReceived;
use App\Mail\ContactAutoReply;
use Inertia\Inertia;

// THIS CONTROLLER IS CURRENTLY BEING USED FOR CONTACT EMAILS RATHER THAN COMPANY CONTACTS, CHANGE IF NECESSARY
// A lot of it does not currently make sense
class ContactController extends Controller
{
    /*
    FRONT
    */

    public function create()
    {
        return Inertia('front/pages/contacts/Contacts');
    }

    public function store(StoreContactRequest $request)
    {
        $validated = $request->validated();

        $contact = ContactMessage::create($validated);

        // Send notification to staff
        Mail::to(config('mail.admin_email', 'admin@istec.pt'))->send(new ContactReceived($contact));

        // Send auto-reply to user
        Mail::to($contact->email)->send(new ContactAutoReply($contact));

        return redirect()->route('contacts.create')
            ->with('success', 'Mensagem enviada com sucesso.');
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/contacts/Index', [
            'contacts' => ContactMessage::latest()->get()
        ]);
    }

    public function adminShow(ContactMessage $contact)
    {
        return Inertia('back/pages/contacts/Show', [
            'contact' => $contact
        ]);
    }

    public function destroy(ContactMessage $contact)
    {
        /*$contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Mensagem eliminada com sucesso.'); */ 
    }
}

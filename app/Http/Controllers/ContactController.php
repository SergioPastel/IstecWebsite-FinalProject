<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ContactController extends Controller
{
    /*
    FRONT
    */

    public function create()
    {
        return Inertia('front/pages/contacts/Index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return redirect()->route('contacts.create')
            ->with('success', 'Mensagem enviada com sucesso.');
    }

    /*
    ADMIN
    */

    public function adminIndex()
    {
        return Inertia('back/pages/contacts/Index', [
            'contacts' => Contact::latest()->get()
        ]);
    }

    public function adminShow(Contact $contact)
    {
        return Inertia('back/pages/contacts/Show', [
            'contact' => $contact
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Mensagem eliminada com sucesso.');
    }
}
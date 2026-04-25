<x-mail::message>

<p style="text-align: center; margin-bottom: 20px;">
    <img src="{{ asset('/istec-logo.png') }}" alt="Logo" style="max-height: 60px;">
</p>

# Obrigado pelo seu contacto!

Olá {{ $contact->name }},

Recebemos a sua mensagem com sucesso. 👍

<x-mail::panel>
A nossa equipa irá analisar o seu pedido e responder o mais brevemente possível.
</x-mail::panel>

Se precisar de acrescentar alguma informação, basta responder a este email.

Cumprimentos,
**Equipa Istec Porto**

</x-mail::message>

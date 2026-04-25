
<x-mail::message>

<p style="text-align: center; margin-bottom: 20px;">
    <img src="{{ asset('/istec-logo.png') }}" alt="Logo" style="max-height: 60px;">
</p>

# 📩 Novo Pedido de Contacto

<x-mail::panel>
<strong>Nome:</strong> {{ $contact->name }}<br>
<strong>Email:</strong> {{ $contact->email }}
</x-mail::panel>

## 📝 Mensagem

<x-mail::panel>
"{{ $contact->message }}"
</x-mail::panel>

</x-mail::message>

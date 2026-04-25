<x-mail::message>

<p style="text-align: center; margin-bottom: 20px;">
    <img src="{{ asset('/istec-logo.png') }}" alt="Logo" style="max-height: 60px;">
</p>

@isset($application->course)
# Candidatura Recebida 🎓
@endisset

@isset($application->event)
# Inscrição Confirmada 📅
@endisset

Olá {{ $application->name }},

@isset($application->course)
Recebemos a sua candidatura ao curso **{{ $application->course->title }}**.
@endisset

@isset($application->event)
Recebemos a sua inscrição no evento **{{ $application->event->title }}**.
@endisset

<x-mail::panel>
A nossa equipa irá analisar a sua submissão e entraremos em contacto brevemente.
</x-mail::panel>

Obrigado pelo seu interesse! 🙌

Cumprimentos,
**Equipa Istec**

</x-mail::message>

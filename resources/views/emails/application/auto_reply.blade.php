<x-mail::message>
@isset($application->course)
# Obrigado por se canditar ao curso {{ $application->course->title }} no Istec!
@endisset

@isset($application->event)
# Obrigado por se inscrever ao evento {{ $application->event->name }} no Istec!
@endisset

Olá {{ $application->name }},

@isset($application->course)
Nós recebemos a sua candidatura ao curso {{ $application->course->title }}. Irémos entrar em contacto logo.
@endisset

@isset($application->event)
Nós recebemos a sua candidatura ao evento {{ $application->event->title }}. Irémos entrar em contacto logo.
@endisset

</x-mail::message>
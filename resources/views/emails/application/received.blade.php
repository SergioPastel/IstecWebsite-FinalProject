<x-mail::message>

<p style="text-align: center; margin-bottom: 20px;">
    <img src="{{ asset('/istec-logo.png') }}" alt="Logo" style="max-height: 60px;">
</p>

# 🎓 Nova Candidatura

<x-mail::panel>
<strong>Nome:</strong> {{ $application->full_name }}<br>
<strong>Email:</strong> {{ $application->email }}<br>
<strong>Telemóvel:</strong> {{ $application->phone }}<br>

@isset($application->identification_number)
<strong>Número de Identificação:</strong> {{ $application->identification_number }}<br>
@endisset
</x-mail::panel>

@isset($application->course)
## 📚 Curso

<x-mail::panel>
{{ $application->course->title }} (ID: {{ $application->course->id }})
</x-mail::panel>
@endisset

@isset($application->event)
## 📅 Evento

<x-mail::panel>
{{ $application->event->name }} (ID: {{ $application->event->id }})
</x-mail::panel>
@endisset

</x-mail::message>

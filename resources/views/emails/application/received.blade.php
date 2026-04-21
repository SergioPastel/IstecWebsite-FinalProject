<x-mail::message>
# Nova canditura

**Nome:** {{ $application->full_name }}<br>
**Email:** {{ $application->email }}<br>
**Telemovel:** {{ $application->phone }}<br>
@isset($application->identification_number)
**Número de Identificação:** {{ $application->identification_number }}<br>
@endisset

@isset($application->course)
**Curso:** {{ $application->course->title }} ({{ $application->course->id }})<br>
@endisset

@isset($application->event)
**Evento:** {{ $application->event->name }} ({{ $application->event->id }})<br>
@endisset


</x-mail::message>
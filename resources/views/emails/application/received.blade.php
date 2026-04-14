<x-mail::message>
# Nova canditura

**Nome:** {{ $application->full_name }}<br>
**Email:** {{ $application->email }}<br>
**Telemovel:** {{ $application->phone }}<br>
**Curso:** {{ $application->course->title }}({{ $application->course->id }})<br>
**Motivação:** {{ $application->motivation }}


</x-mail::message>
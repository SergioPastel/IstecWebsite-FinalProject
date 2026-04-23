<?php
namespace Database\Factories;
use App\Models\Media;
use App\Models\NewsCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    private static array $news = [
        [
            'title' => [
                'pt' => 'ISTEC reforça aposta na formação em Engenharia Informática',
                'en' => 'ISTEC strengthens investment in Computer Engineering education',
            ],
            'excerpt' => [
                'pt' => 'O ISTEC anuncia uma renovação profunda dos seus cursos de Engenharia Informática, integrando novas disciplinas de inteligência artificial, cloud computing e cibersegurança.',
                'en' => 'ISTEC announces a deep renewal of its Computer Engineering courses, integrating new disciplines in artificial intelligence, cloud computing and cybersecurity.',
            ],
            'content' => [
                'pt' => "O ISTEC deu mais um passo na modernização da sua oferta formativa, anunciando um conjunto de melhorias significativas nos programas de Engenharia Informática. As alterações abrangem tanto os planos curriculares como os recursos laboratoriais disponíveis aos estudantes.\n\nEntre as novidades, destacam-se novas unidades curriculares dedicadas a inteligência artificial aplicada, arquiteturas cloud-native e práticas avançadas de cibersegurança. Estas áreas foram identificadas como prioritárias pelo mercado de trabalho nacional e internacional.\n\nO diretor do curso sublinhou que a formação técnica de excelência tem de acompanhar a velocidade da indústria, reforçando o compromisso do instituto em preparar profissionais prontos para os desafios do presente e do futuro.\n\nAs inscrições para o próximo ano letivo já se encontram abertas, com vagas limitadas para garantir uma experiência de aprendizagem personalizada.",
                'en' => "ISTEC has taken another step in modernising its academic offering, announcing a set of significant improvements to the Computer Engineering programmes. The changes cover both the curriculum plans and the laboratory resources available to students.\n\nAmong the highlights are new curricular units dedicated to applied artificial intelligence, cloud-native architectures and advanced cybersecurity practices. These areas have been identified as priorities by the national and international job market.\n\nThe course director stressed that excellence in technical education must keep pace with industry, reinforcing the institute's commitment to preparing professionals ready for the challenges of the present and future.\n\nEnrolments for the next academic year are already open, with limited places to ensure a personalised learning experience.",
            ],
        ],
        [
            'title' => [
                'pt' => 'Estudantes do ISTEC participam em projeto tecnológico internacional',
                'en' => 'ISTEC students participate in international technology project',
            ],
            'excerpt' => [
                'pt' => 'Uma equipa de alunos do ISTEC foi selecionada para integrar um consórcio europeu de inovação digital, desenvolvendo ferramentas de acessibilidade web em parceria com universidades de três países.',
                'en' => 'A team of ISTEC students was selected to join a European digital innovation consortium, developing web accessibility tools in partnership with universities from three countries.',
            ],
            'content' => [
                'pt' => "Quatro estudantes do ISTEC foram selecionados para participar num projeto europeu de inovação tecnológica que reúne universidades de Portugal, Espanha e Polónia. O projeto, com duração de 18 meses, foca-se no desenvolvimento de ferramentas open-source para melhorar a acessibilidade digital.\n\nA equipa portuguesa ficará responsável pelo módulo de testes automatizados de conformidade com as diretrizes WCAG 2.2, integrando técnicas de machine learning para deteção de barreiras de acessibilidade em interfaces web e móveis.\n\nAna Ferreira, uma das estudantes envolvidas, partilhou o seu entusiasmo: é uma oportunidade única de trabalhar com pares internacionais num problema com impacto social real, aprendendo tanto a nível técnico como humano.\n\nO projeto conta com financiamento do programa Erasmus+ e os resultados serão apresentados numa conferência internacional no final do próximo semestre.",
                'en' => "Four ISTEC students have been selected to participate in a European technology innovation project that brings together universities from Portugal, Spain and Poland. The 18-month project focuses on developing open-source tools to improve digital accessibility.\n\nThe Portuguese team will be responsible for the automated compliance testing module against WCAG 2.2 guidelines, integrating machine learning techniques to detect accessibility barriers in web and mobile interfaces.\n\nAna Ferreira, one of the students involved, shared her enthusiasm: it is a unique opportunity to work with international peers on a problem with real social impact, learning so much both technically and as people.\n\nThe project is funded by the Erasmus+ programme and the results will be presented at an international conference at the end of next semester.",
            ],
        ],
        [
            'title' => [
                'pt' => 'ISTEC promove evento dedicado à inovação tecnológica',
                'en' => 'ISTEC hosts event dedicated to technological innovation',
            ],
            'excerpt' => [
                'pt' => 'O TechDay ISTEC 2025 reuniu mais de 300 participantes para debater inteligência artificial, transformação digital e o futuro do trabalho, com oradores convidados de empresas líderes do setor tecnológico.',
                'en' => 'TechDay ISTEC 2025 brought together over 300 participants to discuss artificial intelligence, digital transformation and the future of work, with guest speakers from leading technology companies.',
            ],
            'content' => [
                'pt' => "O auditório do ISTEC encheu-se de estudantes, profissionais e curiosos para a terceira edição do TechDay ISTEC, um evento anual que se tornou referência na comunidade tecnológica do Porto. Com mais de 300 participantes registados, a edição deste ano superou todas as anteriores.\n\nO programa incluiu palestras sobre o impacto da inteligência artificial generativa nas profissões criativas, uma mesa-redonda sobre ética em sistemas autónomos e uma sessão prática de introdução ao desenvolvimento com modelos de linguagem de grande escala.\n\nEntre os oradores convidados estiveram representantes de empresas como a Farfetch, a Blip e a Critical Software, que partilharam casos reais de transformação digital e os desafios encontrados no caminho.\n\nO evento contou ainda com uma área de exposição onde startups incubadas no ISTEC apresentaram os seus produtos e procuraram potenciais investidores e parceiros. A próxima edição está prevista para a primavera de 2026.",
                'en' => "ISTEC's auditorium filled with students, professionals and curious minds for the third edition of TechDay ISTEC, an annual event that has become a reference in Porto's technology community. With over 300 registered participants, this year's edition surpassed all previous ones.\n\nThe programme included talks on the impact of generative artificial intelligence on creative professions, a round table on ethics in autonomous systems and a hands-on session introducing development with large language models.\n\nGuest speakers included representatives from companies such as Farfetch, Blip and Critical Software, who shared real cases of digital transformation and the challenges encountered along the way.\n\nThe event also featured an exhibition area where startups incubated at ISTEC showcased their products and sought potential investors and partners. The next edition is planned for spring 2026.",
            ],
        ],
        [
            'title' => [
                'pt' => 'Novos laboratórios tecnológicos inaugurados no ISTEC',
                'en' => 'New technology laboratories inaugurated at ISTEC',
            ],
            'excerpt' => [
                'pt' => 'O ISTEC inaugurou dois novos laboratórios equipados com estações de trabalho de alto desempenho, infraestrutura de rede dedicada e equipamentos de realidade aumentada para apoiar o ensino prático.',
                'en' => 'ISTEC inaugurated two new laboratories equipped with high-performance workstations, dedicated network infrastructure and augmented reality equipment to support hands-on learning.',
            ],
            'content' => [
                'pt' => "Numa cerimónia que contou com a presença da direção do instituto, corpo docente e representantes de empresas parceiras, o ISTEC inaugurou oficialmente dois novos laboratórios tecnológicos nas suas instalações no Porto.\n\nO Laboratório de Computação Avançada dispõe de 30 estações de trabalho com GPUs dedicadas para processamento de dados e treino de modelos de machine learning, além de acesso a uma infraestrutura de cluster privado para projetos de investigação aplicada.\n\nO segundo espaço, batizado de Laboratório de Experiências Digitais, é equipado com headsets de realidade mista, tablets de desenho profissional e uma parede de LED interativa, criando um ambiente propício ao desenvolvimento de projetos em UX/UI, gamificação e comunicação digital.\n\nO investimento total rondou os 280 mil euros, com apoio do Programa de Recuperação e Resiliência. A direção garantiu que os laboratórios estarão disponíveis para uso dos estudantes fora do horário letivo, incluindo fins de semana.",
                'en' => "In a ceremony attended by the institute's management, teaching staff and representatives of partner companies, ISTEC officially inaugurated two new technology laboratories at its facilities in Porto.\n\nThe Advanced Computing Laboratory features 30 workstations with dedicated GPUs for data processing and machine learning model training, as well as access to a private cluster infrastructure for applied research projects.\n\nThe second space, named the Digital Experiences Laboratory, is equipped with mixed reality headsets, professional drawing tablets and an interactive LED wall, creating an environment conducive to developing projects in UX/UI, gamification and digital communication.\n\nThe total investment amounted to approximately 280 thousand euros, with support from the Recovery and Resilience Plan. Management confirmed that the laboratories will be available for student use outside class hours, including weekends.",
            ],
        ],
        [
            'title' => [
                'pt' => 'ISTEC lança programa de mentoria com profissionais da indústria',
                'en' => 'ISTEC launches mentorship programme with industry professionals',
            ],
            'excerpt' => [
                'pt' => 'O novo programa de mentoria do ISTEC liga estudantes finalistas a profissionais experientes do setor tecnológico, com sessões mensais de acompanhamento e acesso a uma rede de contactos privilegiada.',
                'en' => 'ISTEC\'s new mentorship programme connects final-year students with experienced technology industry professionals, featuring monthly follow-up sessions and access to a privileged contact network.',
            ],
            'content' => [
                'pt' => "O ISTEC lançou oficialmente o programa ISTEC Mentors, uma iniciativa que visa aproximar os estudantes do último ano dos cursos tecnológicos ao mercado de trabalho através de uma relação estruturada com profissionais experientes.\n\nNa primeira edição, 40 estudantes foram emparelhados com mentores provenientes de empresas como a Altice, a NOS, a Worten Digital e várias startups do ecossistema Porto Tech Hub. Cada par compromete-se a realizar pelo menos uma sessão mensal ao longo de um semestre.\n\nO programa inclui ainda workshops temáticos sobre negociação salarial, construção de portfólio técnico e entrevistas em empresas tecnológicas, abertos a todos os participantes.\n\nOs primeiros feedbacks são encorajadores. Carlos Matos, estudante de Engenharia Informática, contou que ter alguém da indústria a orientá-lo ajudou-o a perceber que direção quer dar à sua carreira. As candidaturas para a segunda edição abrem em outubro.",
                'en' => "ISTEC officially launched the ISTEC Mentors programme, an initiative aimed at bringing final-year technology students closer to the job market through a structured relationship with experienced professionals.\n\nIn the first edition, 40 students were paired with mentors from companies such as Altice, NOS, Worten Digital and various startups from the Porto Tech Hub ecosystem. Each pair commits to at least one monthly session over a semester.\n\nThe programme also includes thematic workshops on salary negotiation, building a technical portfolio and interviewing at tech companies, open to all participants.\n\nEarly feedback is encouraging. Carlos Matos, a Computer Engineering student, said that having someone from the industry guiding him helped him understand what direction he wants to take his career. Applications for the second edition open in October.",
            ],
        ],
        [
            'title' => [
                'pt' => 'Parceria entre o ISTEC e empresa tecnológica cria bolsas de investigação',
                'en' => 'Partnership between ISTEC and tech company creates research grants',
            ],
            'excerpt' => [
                'pt' => 'Uma parceria estratégica com uma empresa tecnológica nacional permitirá ao ISTEC financiar três projetos de investigação aplicada conduzidos por estudantes de mestrado durante o próximo ano letivo.',
                'en' => 'A strategic partnership with a national technology company will allow ISTEC to fund three applied research projects led by master\'s students during the next academic year.',
            ],
            'content' => [
                'pt' => "O ISTEC e a Devscope, empresa portuguesa especializada em consultoria e desenvolvimento de software, formalizaram uma parceria estratégica que prevê a criação de três bolsas anuais de investigação aplicada destinadas a estudantes de mestrado.\n\nCada bolsa tem o valor de 4 800 euros e cobre um período de 12 meses. Os projetos selecionados deverão incidir sobre áreas como automação de processos, análise de dados em tempo real e integração de sistemas legados com plataformas modernas.\n\nOs candidatos terão acesso ao ambiente técnico real da empresa, incluindo bases de código em produção, equipa de engenharia e reuniões de produto, garantindo que a investigação tem aplicação prática imediata.\n\nAs candidaturas decorrem até ao final do mês e serão avaliadas por um júri misto composto por docentes do ISTEC e técnicos seniores da Devscope. Os resultados serão divulgados até ao início de setembro.",
                'en' => "ISTEC and Devscope, a Portuguese company specialising in software consulting and development, have formalised a strategic partnership that provides for the creation of three annual applied research grants for master's students.\n\nEach grant is worth 4,800 euros and covers a period of 12 months. Selected projects should focus on areas such as process automation, real-time data analysis and integration of legacy systems with modern platforms.\n\nCandidates will have access to the company's real technical environment, including production codebases, the engineering team and product meetings, ensuring that the research has immediate practical application.\n\nApplications are open until the end of the month and will be evaluated by a mixed jury composed of ISTEC faculty and senior Devscope engineers. Results will be announced by the beginning of September.",
            ],
        ],
    ];

    public function definition(): array
    {
        $news = fake()->randomElement(self::$news);
        return [
            'media_id' => Media::factory(),
            'news_category_id' => NewsCategory::inRandomOrder()->first()->id,
            'title' => $news['title'],
            'excerpt' => $news['excerpt'],
            'content' => $news['content'],
        ];
    }
}

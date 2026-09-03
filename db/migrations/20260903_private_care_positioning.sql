-- Posiciona o site para atendimento particular e remove endereço público exato.
-- Mantém telefone, WhatsApp, Doctoralia e avaliação existentes.

UPDATE site_config
SET value = json_set(
  value,
  '$.address.clinic', 'Atendimento presencial',
  '$.address.street', '',
  '$.address.cityLine', 'Jundiaí, SP',
  '$.address.postalCode', '',
  '$.address.lat', '',
  '$.address.lng', '',
  '$.mapEmbed', 'https://www.google.com/maps?q=Jundia%C3%AD%2C%20SP&hl=pt-BR&z=12&output=embed'
)
WHERE key = 'contact';

UPDATE site_config
SET value = json('{"items":[{"label":"TDAH em adultos","href":"/tdah-adultos"},{"label":"Medicina canabinoide","href":"/medicina-canabinoide"},{"label":"Teleconsulta","href":"/teleconsulta"},{"label":"Blog","href":"/blog"},{"label":"Sobre","href":"/about"}]}')
WHERE key = 'nav';

UPDATE site_config
SET value = json_set(
  value,
  '$.tagline', 'Psiquiatria com escuta atenta, acompanhamento individualizado e tempo de qualidade.'
)
WHERE key = 'brand';

UPDATE page_meta
SET
  description = 'Psiquiatra em Jundiaí. Atendimento particular para ansiedade, burnout, insônia, TDAH em adultos e medicina canabinoide, presencial ou por teleconsulta.',
  keywords = json('["psiquiatra jundiaí","dr gustavo mendes","dr gustavo mendes e silva","psiquiatra gustavo mendes","teleconsulta psiquiátrica","psiquiatra online","consulta psiquiátrica humanizada","burnout jundiaí","esgotamento profissional","tratamento síndrome do pânico","tratamento insônia jundiaí","escuta atenta","psiquiatria humanizada","autismo jundiaí","medicina canabinoide","tdah em adultos","acompanhamento psicoterapêutico","reembolso consulta psiquiatra","transtornos do sono","CRM 218133","psiquiatra particular jundiaí","tratamento depressão","tratamento ansiedade","psiquiatra autismo"]'),
  og_json = json_set(
    og_json,
    '$.description', 'Atendimento psiquiátrico particular em Jundiaí para TDAH em adultos, medicina canabinoide, ansiedade, burnout e insônia.'
  )
WHERE page_id = 'home';

UPDATE page_meta
SET description = 'Agende atendimento particular com o Dr. Gustavo Mendes e Silva, psiquiatra em Jundiaí (CRM 218133/SP), presencial ou por teleconsulta.'
WHERE page_id = 'contact';

UPDATE blocks
SET content_json = json_set(
  content_json,
  '$.chips', json('["Burnout","Esgotamento","Ansiedade","Medo","Pânico","Insônia","Dificuldade de foco","Desesperança","Perda de sentido"]')
)
WHERE id = 'home-symptoms';

UPDATE blocks
SET content_json = json_set(
  content_json,
  '$.formacaoParas', json('["Cuidado psiquiátrico com <strong>tempo e escuta atenta</strong> — para além do diagnóstico pronto. Cada pessoa traz uma <strong>história</strong> que merece ser ouvida por inteiro.","Minha prática inclui <strong>Psiquiatria, TDAH em adultos, Medicina Canabinoide, Sono, Dependência Química, ACT e Cuidados Paliativos</strong>. Consultas com o tempo necessário para um plano terapêutico adequado."]'),
  '$.diferenciaisParas', json('["Meu compromisso é olhar para você por inteiro — não apenas o sintoma, mas o contexto que o cerca: <strong>trabalho, sono, relações, história</strong>. E com um objetivo claro desde o começo: <strong>devolver sua autonomia</strong>. Não quero te manter em tratamento para sempre.","Quando indicado, o plano pode integrar <strong>manejo medicamentoso e acompanhamento psicoterapêutico</strong>, com objetivos claros, reavaliação e decisões compartilhadas."]')
)
WHERE id = 'home-about';

UPDATE blocks
SET content_json = json_set(
  content_json,
  '$.items', json('[{"question":"Como funciona o atendimento particular e o reembolso?","answer":"O atendimento é particular. Forneço recibo e, quando necessário, a documentação do atendimento para que você possa solicitar reembolso ao seu convênio, conforme as regras do seu plano."},{"question":"Você também faz acompanhamento psicoterapêutico?","answer":"Sim. Quando faz sentido para o caso, o acompanhamento pode integrar avaliação psiquiátrica, manejo medicamentoso e acompanhamento psicoterapêutico ao longo das consultas."},{"question":"Como posso agendar uma consulta?","answer":"A forma mais rápida é pelo WhatsApp (11) 98706-5632 — respondo pessoalmente a cada mensagem. Se preferir, atendo também por telefone no mesmo número ou por e-mail em contato@drgustavomendes.com."},{"question":"Quais são as queixas mais comuns que você atende?","answer":"Costumo acompanhar TDAH em adultos, ansiedade, burnout e esgotamento, medo e pânico, insônia, neurodivergência e casos em que vale avaliar medicina canabinoide — sempre considerando o contexto de cada pessoa."},{"question":"Qual é a sua especialização?","answer":"Minha prática reúne Psiquiatria, TDAH em adultos, Medicina Canabinoide, Transtornos do Sono, Dependência Química, Terapia ACT e Cuidados Paliativos. CRM 218133/SP."},{"question":"Onde fica o consultório?","answer":"O atendimento presencial acontece em Jundiaí/SP. A localização completa é informada diretamente durante o agendamento pelo WhatsApp."},{"question":"Qual é o diferencial do seu atendimento?","answer":"Tempo de qualidade, escuta atenta e um plano que pode integrar psiquiatria e acompanhamento psicoterapêutico. As escolhas são explicadas com clareza e o objetivo é fortalecer sua autonomia."}]')
)
WHERE id = 'home-faq';

UPDATE blocks
SET
  content_json = json_set(
    content_json,
    '$.subtitle', 'Atendimento particular em Jundiaí ou por teleconsulta. Receba informações sobre horários, acompanhamento e documentação para reembolso pelo WhatsApp.'
  ),
  design_json = json_set(design_json, '$.showForm', json('false'))
WHERE id = 'home-contact';

UPDATE blocks
SET content_json = json_set(
  content_json,
  '$.note', 'Atendimento particular em Jundiaí, presencial ou por teleconsulta. Forneço documentação para solicitação de reembolso conforme as regras do plano.'
)
WHERE id = 'about-pricing-cta';

UPDATE blocks
SET status = 'draft'
WHERE id = 'contact-price-badge';

UPDATE pages
SET status = 'unpublished'
WHERE id = 'domiciliar';

UPDATE blocks
SET status = 'draft'
WHERE page_id = 'domiciliar';

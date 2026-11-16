const questions = [
  { text: 'Você aceita ser mimada um pouquinho?', answers: ['Claro que sim!', 'Depende... quanto? KKKKK'], reactions: ['Resposta anotada com sucesso. Já estou pensando nos mimos. ♡', 'Olha, o orçamento é secreto... mas o carinho é ilimitado.'] },
  { text: 'Você está preparada para comer uma quantidade questionável de carne?', answers: ['Nasci preparada!', 'Só vou pela companhia.'], reactions: ['Excelente. O rodízio que se prepare.', 'A companhia agradece — e a carne também vai ser boa, prometo.'] },
  { text: 'Uma noite comigo, comida boa e muitas risadas. Parece um bom plano?', answers: ['Perfeito!', 'Ainda estou analisando... KKKKK'], reactions: ['Eu sabia que você tinha bom gosto. ♡', 'Análise aprovada pelo comitê da saudade.'] }
];
const screens = ['intro', 'questions', 'invite', 'message', 'voucher'];
let questionIndex = 0;
const stepLabel = document.getElementById('stepLabel');
const progressBar = document.getElementById('progressBar');

function showScreen(name) {
  screens.forEach((screen, index) => {
    const el = document.getElementById(`screen-${screen}`);
    const active = screen === name;
    el.classList.toggle('active', active);
    el.hidden = !active;
    if (active) el.setAttribute('aria-current', 'step');
    else el.removeAttribute('aria-current');
    if (active) progressBar.style.width = `${((index + 1) / screens.length) * 100}%`;
  });
  const labels = { intro: 'UMA SURPRESA', questions: 'AQUECIMENTO', invite: 'O CONVITE', message: 'UM RECADINHO', voucher: 'SEU PRESENTE' };
  stepLabel.textContent = labels[name];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderQuestion() {
  const question = questions[questionIndex];
  document.getElementById('questionCount').textContent = `0${questionIndex + 1} / 03`;
  document.getElementById('questionText').textContent = question.text;
  const answers = document.getElementById('answers');
  const reaction = document.getElementById('reaction');
  const next = document.getElementById('nextQuestion');
  reaction.textContent = '';
  next.hidden = true;
  answers.replaceChildren();
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.type = 'button';
    button.textContent = answer;
    button.addEventListener('click', () => {
      [...answers.children].forEach(item => item.disabled = true);
      reaction.textContent = question.reactions[index];
      next.textContent = questionIndex === questions.length - 1 ? 'Tenho uma coisa para te mostrar →' : 'Próxima pergunta →';
      next.hidden = false;
      next.focus({ preventScroll: true });
    });
    answers.append(button);
  });
}
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
  const target = button.dataset.next;
  if (target === 'questions') renderQuestion();
  showScreen(target);
}));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.back)));
document.getElementById('nextQuestion').addEventListener('click', () => {
  questionIndex += 1;
  if (questionIndex >= questions.length) showScreen('invite');
  else renderQuestion();
});
document.getElementById('acceptButton').addEventListener('click', () => {
  burstHearts();
  window.setTimeout(() => showScreen('message'), 850);
});
document.querySelector('[data-next="voucher"]').addEventListener('click', () => showScreen('voucher'));
document.getElementById('printButton').addEventListener('click', () => window.print());
document.getElementById('restartButton').addEventListener('click', () => {
  questionIndex = 0;
  renderQuestion();
  showScreen('intro');
});
function burstHearts() {
  const layer = document.getElementById('confettiLayer');
  const colors = ['#a84d4a', '#7b2934', '#d39b76', '#b9965d', '#e8c5bd'];
  for (let i = 0; i < 34; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'confetti';
    heart.textContent = Math.random() > 0.28 ? '♡' : '✳';
    heart.style.setProperty('--x', `${Math.random() * 100}%`);
    heart.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    heart.style.setProperty('--dur', `${1.8 + Math.random() * 1.6}s`);
    heart.style.setProperty('--col', colors[Math.floor(Math.random() * colors.length)]);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
    layer.append(heart);
  }
}

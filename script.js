const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

const consultForm = document.querySelector('#consult-form');
if (consultForm) {
  consultForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!consultForm.reportValidity()) return;

    const formData = new FormData(consultForm);
    const providers = formData.getAll('providers');
    if (providers.length === 0) {
      document.querySelector('.provider-field').scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.querySelector('.provider-field input').focus();
      return;
    }

    const lines = [
      `姓名：${formData.get('name')}`,
      `公司 / 团队：${formData.get('company') || '未填写'}`,
      `工作邮箱：${formData.get('email')}`,
      `联系电话：${formData.get('phone') || '未填写'}`,
      `感兴趣的平台：${providers.join('、')}`,
      `优先联系方法：${formData.get('preference')}`,
      '',
      '需求描述：',
      formData.get('requirements')
    ];
    const subject = encodeURIComponent(`猫猫云咨询 — ${formData.get('name')}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:ianzhangyin@qq.com?subject=${subject}&body=${body}`;
  });
}

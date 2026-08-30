/* ============================================================
   Chowbus Payroll · 标准外壳脚本（所有 payroll 页面共用）
   用法：页面里放 <div class="cb-app"><main class="cb-main">…内容…</main></div>
        再调用 renderShell('overview'|'run'|'company'|'employees'|'taxes')
   ============================================================ */
(function(){
  var CHEV = '<svg class="chev" width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 5.5 7 9.5l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var IC = {
    home:'<path d="M4 9.2 10 4l6 5.2V16a1 1 0 0 1-1 1h-3v-4H8v4H5a1 1 0 0 1-1-1z"/>',
    adjust:'<path d="M3.5 7h13M3.5 13h13M8 5.2v3.6M12.5 11.2v3.6"/>',
    txn:'<path d="M3.5 6h13v8h-13zM3.5 9h13"/>',
    ai:'<path d="M6.6 3.6h6.8v12.8H6.6zM8.8 14.6h2.4"/>',
    orders:'<path d="M6 3.6h8v12.8l-2-1.2-2 1.2-2-1.2-2 1.2zM8 7.6h4M8 10.6h4"/>',
    menu:'<path d="M5 5.6h10M5 10h10M5 14.4h6"/>',
    promo:'<path d="M4 10.6 10.6 4l4.4 4.4L8.4 15zM12 7.1h.01"/>',
    team:'<path d="M7.6 9.6a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8Z"/><path d="M2.9 16.4c0-2.6 2.1-4.4 4.7-4.4s4.7 1.8 4.7 4.4M13.4 5.2a2.6 2.6 0 0 1 0 4.9M15 11.7c1.4.5 2.4 1.6 2.4 3.1"/>',
    devices:'<path d="M3.5 5h13v8h-13zM7.5 16.4h5M10 13v3.4"/>',
    account:'<path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.6 16.4c0-3 2.6-4.8 5.4-4.8s5.4 1.8 5.4 4.8"/>',
    smart:'<path d="M4.6 10.6 8.4 14.4 15.4 5.6"/>',
    pay:'<path d="M10 4v12M12.6 6.6C12 5.8 11 5.4 10 5.4c-1.5 0-2.5.8-2.5 2 0 2.6 5 1.5 5 4.1 0 1.2-1 2-2.5 2-1.1 0-2.1-.5-2.7-1.3"/>'
  };
  function itm(key,zh,en,chev){
    return '<div class="cb-item"><svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">'+IC[key]+'</svg><span class="lb"><span class="zh">'+zh+'</span><span class="en">'+en+'</span></span>'+(chev?CHEV:'')+'</div>';
  }
  var SUBS = [
    ['overview','概览','Overview','chowbus-payroll-overview.html'],
    ['run','跑薪','Run Payroll','chowbus-payroll-run-payroll.html'],
    ['company','公司设置','Company Setup','chowbus-payroll-company-setup.html'],
    ['employees','员工管理','Employees','chowbus-payroll-employees.html'],
    ['taxes','税务与申报','Taxes &amp; Filings','chowbus-payroll-taxes-filings.html']
  ];

  var HEADER_HTML =
    '<div class="cb-logo"><span class="wm">chowbus</span></div>'+
    '<div class="cb-hbar">'+
      '<svg class="cb-collapse" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.6 4.4h9.4M7.6 10h9.4M7.6 15.6h9.4M5 6.6 2.4 10 5 13.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
      '<span class="cb-store">may localserver -12555-Curry Flurry(12555)<svg width="13" height="13" viewBox="0 0 14 14" fill="none" style="color:#374151"><path d="M3 5.5 7 9.5l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '<div class="cb-vsep"></div>'+
      '<span class="cb-region">USA<svg width="13" height="13" viewBox="0 0 14 14" fill="none" style="color:#374151"><path d="M3 5.5 7 9.5l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
      '<div class="cb-hright"><span>sisi.hu@chowbus.com</span><div class="cb-lang" onclick="toggleLanguage()"><span class="lz">中文</span><span class="le">EN</span></div></div>'+
    '</div>';

  function buildSidebar(active){
    var subHtml = SUBS.map(function(s){
      var on = s[0]===active;
      return '<div class="cb-subitem '+(on?'active':'')+'" onclick="location.href=\''+s[3]+'\'"><span class="zh">'+s[1]+'</span><span class="en">'+s[2]+'</span>'+(on?'<span class="bar"></span>':'')+'</div>';
    }).join('');
    return itm('home','首页','Home')+
      itm('adjust','调整管理','Adjustment Management')+
      itm('txn','交易','Transactions')+
      itm('ai','AI电话点餐','AI Phone Ordering')+
      itm('orders','订单','Orders')+
      itm('menu','菜单','Menu',true)+
      itm('promo','促销管理','Promotion Management')+
      itm('team','团队管理','Team Management',true)+
      itm('devices','设备','Devices')+
      itm('account','账户','Account',true)+
      itm('smart','智能点餐','Smart Ordering',true)+
      /* ===== Payroll 一级 + 二级：置于侧边栏最底部 ===== */
      '<div class="cb-item group-active"><svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">'+IC.pay+'</svg><span class="lb"><span class="zh">薪酬</span><span class="en">Payroll</span></span>'+CHEV+'</div>'+
      '<div class="cb-sub">'+subHtml+'</div>';
  }

  window.renderShell = function(active){
    var app = document.querySelector('.cb-app');
    if(!app) return;
    var main = app.querySelector('.cb-main');
    var header = document.createElement('header');
    header.className = 'cb-header';
    header.innerHTML = HEADER_HTML;
    var row = document.createElement('div');
    row.className = 'cb-row';
    var nav = document.createElement('nav');
    nav.className = 'cb-sidebar';
    nav.id = 'cbSidebar';
    nav.innerHTML = buildSidebar(active);
    app.insertBefore(header, main);
    app.insertBefore(row, main);
    row.appendChild(nav);
    row.appendChild(main);
  };

  window.toggleLanguage = function(){
    var en = !document.body.classList.contains('lang-en');
    document.body.classList.toggle('lang-en', en);
    document.body.classList.toggle('lang-zh', !en);
    try{ localStorage.setItem('cbLang', en?'en':'zh'); }catch(e){}
  };
  try{ if(localStorage.getItem('cbLang')==='en'){ document.body.classList.remove('lang-zh'); document.body.classList.add('lang-en'); } }catch(e){}
})();

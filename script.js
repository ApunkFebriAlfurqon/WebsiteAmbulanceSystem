function switchTab(id){
  document.querySelectorAll('.nav-tab').forEach((t,i)=>{
    const ids=['dashboard','ambulans','staff','rs','pesan'];
    t.classList.toggle('active', ids[i]===id);
  });
  document.querySelectorAll('.page').forEach(p=>{
    p.classList.toggle('active', p.id==='page-'+id);
  });
}

let selType='emg';
function pickType(t){
  selType=t;
  document.getElementById('tEmg').className='type-card'+(t==='emg'?' sel-emg':'');
  document.getElementById('tRef').className='type-card'+(t==='ref'?' sel-ref':'');
}

let cdInterval=null;
function startPanic(){
  document.getElementById('panicMain').style.display='none';
  const cd=document.getElementById('countdownArea');
  cd.style.display='flex';
  let c=3;
  document.getElementById('countNum').textContent=c;
  cdInterval=setInterval(()=>{
    c--;
    document.getElementById('countNum').textContent=c;
    if(c<=0){clearInterval(cdInterval);firePanic();}
  },1000);
}
function cancelPanic(){
  clearInterval(cdInterval);
  document.getElementById('countdownArea').style.display='none';
  document.getElementById('panicMain').style.display='flex';
}
function firePanic(){
  document.getElementById('countdownArea').style.display='none';
  document.getElementById('panicMain').style.display='flex';
  document.getElementById('mIcon').textContent='🆘';
  document.getElementById('mTitle').textContent='SOS Terkirim!';
  document.getElementById('mSub').textContent='Ambulans darurat & dispatcher dihubungi. Tetap di lokasi Anda.';
  document.getElementById('mEta').textContent='3 mnt';
  document.getElementById('mDetail').textContent='Unit: AMB-022 · Dispatcher: Rina P. · GPS aktif';
  document.getElementById('successModal').classList.add('active');
}

const units=['AMB-001','AMB-007','AMB-009','AMB-019','AMB-031','AMB-035'];
const drivers=['Budi S.','Agus W.','Rizal P.','Yusuf S.','Teguh S.','Bagas P.'];
function submitOrder(){
  const name=document.getElementById('patName').value.trim();
  const pickup=document.getElementById('pickupLoc').value.trim();
  const dest=document.getElementById('destRS').value;
  if(!name||!pickup||!dest){alert('Mohon isi nama pasien, lokasi jemput, dan RS tujuan.');return;}
  const i=Math.floor(Math.random()*units.length);
  const eta=selType==='emg'?(Math.floor(Math.random()*5)+5)+' mnt':(Math.floor(Math.random()*10)+15)+' mnt';
  document.getElementById('mIcon').textContent='✅';
  document.getElementById('mTitle').textContent=selType==='emg'?'Ambulans Darurat Dikonfirmasi!':'Ambulans Rujukan Dikonfirmasi!';
  document.getElementById('mSub').textContent='Pasien: '+name+'\nTujuan: '+dest;
  document.getElementById('mEta').textContent=eta;
  document.getElementById('mDetail').textContent='Unit: '+units[i]+' · Pengemudi: '+drivers[i];
  document.getElementById('successModal').classList.add('active');
}
function closeModal(){
  document.getElementById('successModal').classList.remove('active');
}

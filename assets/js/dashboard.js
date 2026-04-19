document.addEventListener("DOMContentLoaded", async () => {

    const FIELD_NAMES = {
        // L1 S1
        'p1_lf_td':'Logique Formelle TD',       'p1_lf_ds':'Logique Formelle DS',       'p1_lf_ex':'Logique Formelle Exam',
        'p1_tm_td':'Multimédia TD',             'p1_tm_ds':'Multimédia DS',             'p1_tm_ex':'Multimédia Exam',
        'p1_alg1_td':'Algèbre 1 TD',            'p1_alg1_ds':'Algèbre 1 DS',            'p1_alg1_ex':'Algèbre 1 Exam',
        'p1_ana1_td':'Analyse 1 TD',            'p1_ana1_ds':'Analyse 1 DS',            'p1_ana1_ex':'Analyse 1 Exam',
        'p1_ang1_ds':'Anglais 1 DS',            'p1_ang1_ex':'Anglais 1 Exam',
        'p1_tc1_ds':'Tech. Com 1 DS',           'p1_tc1_ex':'Tech. Com 1 Exam',
        'p1_algo1_td':'Algorithmique 1 TD',     'p1_algo1_ds':'Algorithmique 1 DS',     'p1_algo1_ex':'Algorithmique 1 Exam',
        'p1_atp1_td':'ATP 1 TD',               'p1_atp1_ds':'ATP 1 DS',               'p1_atp1_ex':'ATP 1 Exam',
        'p1_se1_td':'Sys. Exploitation 1 TD',  'p1_se1_ds':'Sys. Exploitation 1 DS',  'p1_se1_ex':'Sys. Exploitation 1 Exam',
        'p1_arch_td':'Architecture TD',         'p1_arch_ds':'Architecture DS',         'p1_arch_ex':'Architecture Exam',

        //L1 S2
        'p2_fbd_td':'Fond. BD TD',             'p2_fbd_ds':'Fond. BD DS',             'p2_fbd_ex':'Fond. BD Exam',
        'p2_alg2_td':'Algèbre 2 TD',           'p2_alg2_ds':'Algèbre 2 DS',           'p2_alg2_ex':'Algèbre 2 Exam',
        'p2_ana2_td':'Analyse 2 TD',           'p2_ana2_ds':'Analyse 2 DS',           'p2_ana2_ex':'Analyse 2 Exam',
        'p2_algo2_td':'Algorithmique 2 TD',    'p2_algo2_ds':'Algorithmique 2 DS',    'p2_algo2_ex':'Algorithmique 2 Exam',
        'p2_atp2_td':'ATP 2 TD',              'p2_atp2_ds':'ATP 2 DS',              'p2_atp2_ex':'ATP 2 Exam',
        'p2_py_td':'Python TD',               'p2_py_ds':'Python DS',               'p2_py_ex':'Python Exam',
        'p2_se2_td':'Sys. Exploitation 2 TD', 'p2_se2_ds':'Sys. Exploitation 2 DS', 'p2_se2_ex':'Sys. Exploitation 2 Exam',
        'p2_res_td':'Réseaux TD',             'p2_res_ds':'Réseaux DS',             'p2_res_ex':'Réseaux Exam',
        'p2_ang2_ds':'Anglais 2 DS',          'p2_ang2_ex':'Anglais 2 Exam',
        'p2_tc2_ds':'Tech. Com 2 DS',         'p2_tc2_ex':'Tech. Com 2 Exam',
        'p2_ccn_ds':'CCN DS',                 'p2_ccn_ex':'CCN Exam',

        // ── L2 S3 ──
        'p2_si_td':'UML TD',        'p2_si_ds':'UML DS',        'p2_si_ex':'UML Exam',
        'p2_java_td':'Java TD',     'p2_java_ds':'Java DS',     'p2_java_ex':'Java Exam',
        'p2_proba_td':'Proba TD',   'p2_proba_ds':'Proba DS',   'p2_proba_ex':'Proba Exam',
        'p2_tla_td':'TLA TD',       'p2_tla_ds':'TLA DS',       'p2_tla_ex':'TLA Exam',
        'p2_graph_td':'Graphes TD', 'p2_graph_ds':'Graphes DS', 'p2_graph_ex':'Graphes Exam',
        'p2_bd_td':'Ing. BD TD',    'p2_bd_ds':'Ing. BD DS',    'p2_bd_ex':'Ing. BD Exam',
        'p2_res_td':'Réseaux TD',   'p2_res_ds':'Réseaux DS',   'p2_res_ex':'Réseaux Exam',
        'p2_ang_ds':'Anglais DS',   'p2_ang_ex':'Anglais Exam',
        'p2_gest_ds':'Gestion DS',  'p2_gest_ex':'Gestion Exam',
        'p2_ent_td':'Ent. Sys TD',  'p2_ent_ds':'Ent. Sys DS',  'p2_ent_ex':'Ent. Sys Exam',
        'p2_sys_td':'Modeling TD',  'p2_sys_ds':'Modeling DS',  'p2_sys_ex':'Modeling Exam',

        // ── L2 S4 ──
        'p4_abd_td':'Admin BD TD',    'p4_abd_ds':'Admin BD DS',    'p4_abd_ex':'Admin BD Exam',
        'p4_edd_td':'Entrepôts TD',   'p4_edd_ds':'Entrepôts DS',   'p4_edd_ex':'Entrepôts Exam',
        'p4_tl_td':'Tests TD',        'p4_tl_ds':'Tests DS',        'p4_tl_ex':'Tests Exam',
        'p4_tc_td':'Compilation TD',  'p4_tc_ds':'Compilation DS',  'p4_tc_ex':'Compilation Exam',
        'p4_web_td':'Web TD',         'p4_web_ds':'Web DS',         'p4_web_ex':'Web Exam',
        'p4_idx_td':'Indexation TD',  'p4_idx_ds':'Indexation DS',  'p4_idx_ex':'Indexation Exam',
        'p4_ia_td':'IA TD',           'p4_ia_ds':'IA DS',           'p4_ia_ex':'IA Exam',
        'p4_agile_td':'Agile TD',     'p4_agile_ds':'Agile DS',     'p4_agile_ex':'Agile Exam',
        'p4_ang4_ds':'Anglais 4 DS',  'p4_ang4_ex':'Anglais 4 Exam',
        'p4_droit_ds':'Droit DS',     'p4_droit_ex':'Droit Exam',
        'p4_bi_td':'BI TD',           'p4_bi_ds':'BI DS',           'p4_bi_ex':'BI Exam',
        'p4_dbt_td':'Digital TD',     'p4_dbt_ds':'Digital DS',     'p4_dbt_ex':'Digital Exam',

        // ── L3 S5 ──
        'p5_dar_td':'Dev. App. Réparties TD',  'p5_dar_ds':'Dev. App. Réparties DS',  'p5_dar_ex':'Dev. App. Réparties Exam',
        'p5_mob_td':'Dev. Mobile TD',          'p5_mob_ds':'Dev. Mobile DS',          'p5_mob_ex':'Dev. Mobile Exam',
        'p5_ml_td':'Machine Learning TD',      'p5_ml_ds':'Machine Learning DS',      'p5_ml_ex':'Machine Learning Exam',
        'p5_sec_td':'Sécurité TD',             'p5_sec_ds':'Sécurité DS',             'p5_sec_ex':'Sécurité Exam',
        'p5_soa_td':'SOA TD',                  'p5_soa_ds':'SOA DS',                  'p5_soa_ex':'SOA Exam',
        'p5_cloud_td':'Cloud TD',              'p5_cloud_ds':'Cloud DS',              'p5_cloud_ex':'Cloud Exam',
        'p5_bd_td':'Big Data TD',              'p5_bd_ds':'Big Data DS',              'p5_bd_ex':'Big Data Exam',
        'p5_prep_td':'Prép. Pro TD',           'p5_prep_ds':'Prép. Pro DS',           'p5_prep_ex':'Prép. Pro Exam',
        'p5_entr_ds':'Entreprenariat DS',      'p5_entr_ex':'Entreprenariat Exam',
        'p5_ang5_ds':'Anglais 5 DS',           'p5_ang5_ex':'Anglais 5 Exam',
        'p5_esa_td':'ESA TD',                  'p5_esa_ds':'ESA DS',                  'p5_esa_ex':'ESA Exam',
        'p5_bpe_td':'BPE TD',                  'p5_bpe_ds':'BPE DS',                  'p5_bpe_ex':'BPE Exam',
        'p6_pfe_ex':'PFE Soutenance',
    };
    try {
        const res = await fetch('../api/user.php');
        const data = await res.json();

        if (data.nom) {
            document.getElementById('user-nom').textContent = data.nom;
        }
    } catch (e) {
        console.error("❌ Erreur user:", e);
    }
    try {
        const res = await fetch('../api/todo.php?action=stats');
        const data = await res.json();

        document.getElementById('todo-total').textContent = data.total ?? '--';
        document.getElementById('todo-afaire').textContent = data.a_faire ?? '--';
        document.getElementById('todo-encours').textContent = data.en_cours ?? '--';
        document.getElementById('todo-termine').textContent = data.termine ?? '--';
        document.getElementById('todo-progression').textContent = data.progression ?? '0';
        document.getElementById('todo-progress-bar').style.width = (data.progression ?? 0) + '%';
        const msg = document.getElementById('welcome-msg');
        if (data.a_faire > 0) {
            msg.textContent = `Tu as ${data.a_faire} tâche(s) à faire et tes flashcards t'attendent.`;
        } else {
            msg.textContent = `Toutes tes tâches sont terminées, bravo ! 🎉`;
        }

    } catch (e) {
        console.error("❌ Erreur stats todo:", e);
    }
    try {
        const res = await fetch('../api/flashcards.php?action=stats');
        const data = await res.json();

        document.getElementById('flash-total').textContent = data.total_cartes ?? '--';
        document.getElementById('flash-apprises').textContent = data.cartes_apprises ?? '0';

    } catch (e) {
        console.error("❌ Erreur stats flashcards:", e);
    }

    // ── 3. DERNIÈRE MOYENNE ──
    try {
        const res = await fetch('../api/dashboard.php?action=last_moyenne');
        const data = await res.json();

        if (data.moyenne !== null && data.moyenne !== undefined) {
            document.getElementById('last-moyenne').textContent = parseFloat(data.moyenne).toFixed(2);
            document.getElementById('last-moyenne-niveau').textContent = data.niveau ?? '';
        } else {
            document.getElementById('last-moyenne').textContent = 'N/A';
        }

    } catch (e) {
        console.error("❌ Erreur dernière moyenne:", e);
    }
    try {
        const res = await fetch('../api/dashboard.php?action=best_moyenne');
        const data = await res.json();

        if (data.moyenne !== null && data.moyenne !== undefined) {
            document.getElementById('best-moyenne').textContent = parseFloat(data.moyenne).toFixed(2);
            document.getElementById('best-moyenne-niveau').textContent = data.niveau ?? '';
        } else {
            document.getElementById('best-moyenne').textContent = 'N/A';
        }

    } catch (e) {
        console.error("❌ Erreur meilleure moyenne:", e);
    }
    try {
        const res = await fetch('../api/dashboard.php?action=notes_faibles');
        const data = await res.json();

        const container = document.getElementById('alertes-container');

        if (data.length > 0) {
            let html = `
                <div style="
                    background: #fff3f3; 
                    border-left: 4px solid #e74c3c; 
                    border-radius: 10px; 
                    padding: 15px 20px; 
                    margin-bottom: 20px;
                ">
                    <h3 style="color: #e74c3c; margin-bottom: 10px;">
                        ⚠️ Matières à renforcer
                    </h3>
                    <ul style="list-style:none; padding:0; margin:0;">
            `;

            data.forEach(note => {
                html += `
                    <li style="padding: 5px 0; color: #555;">
                        🔴 <strong>${note.niveau}</strong> — 
                        ${FIELD_NAMES[note.field_id] || note.field_id} :
                        <strong style="color:#e74c3c;">${note.valeur}/20</strong>
                    </li>
                `;
            });

            html += `</ul></div>`;
            container.innerHTML = html;
        }

    } catch (e) {
        console.error("❌ Erreur notes faibles:", e);
    }

    // ── 5. MEMORY GAME (localStorage) ──
    const bestScore = localStorage.getItem('memory_best_score') ?? '--';
    const parties = localStorage.getItem('memory_parties_jouees') ?? '0';

    document.getElementById('memory-best').textContent = bestScore;
    document.getElementById('memory-parties').textContent = parties;

});
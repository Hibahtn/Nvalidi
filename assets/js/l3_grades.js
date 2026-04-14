const L3_CONFIG = {
  semesters: [

    /* ══════════════ SEMESTRE 5 ══════════════ */
    {
      label: 'Semestre 5',
      modules: [

        {
          label: "Développement d'applications",
          moyId: 'p5_m_dev', crId: 'p5_cr_dev',
          coef: 2.5, credit: 5,
          matieres: [
            { tdId:'p5_dar_td', dsId:'p5_dar_ds', exId:'p5_dar_ex', coef:1.5, moyId:'p5_m_dar', crId:'p5_cr_dar' },
            { tdId:'p5_mob_td', dsId:'p5_mob_ds', exId:'p5_mob_ex', coef:1,   moyId:'p5_m_mob', crId:'p5_cr_mob' },
          ]
        },

        {
          label: 'Machine Learning et sécurité',
          moyId: 'p5_m_mls', crId: 'p5_cr_mls',
          coef: 2, credit: 4,
          matieres: [
            { tdId:'p5_ml_td',  dsId:'p5_ml_ds',  exId:'p5_ml_ex',  coef:1, moyId:'p5_m_ml',  crId:'p5_cr_ml'  },
            { tdId:'p5_sec_td', dsId:'p5_sec_ds', exId:'p5_sec_ex', coef:1, moyId:'p5_m_sec', crId:'p5_cr_sec' },
          ]
        },

        {
          label: 'Architecture SOA et services Web',
          moyId: 'p5_m_soam', crId: 'p5_cr_soam',
          coef: 2, credit: 4,
          matieres: [
            { tdId:'p5_soa_td', dsId:'p5_soa_ds', exId:'p5_soa_ex', coef:2, moyId:'p5_m_soa', crId:'p5_cr_soa' },
          ]
        },

        {
          label: 'Cloud & Big Data',
          moyId: 'p5_m_cbd', crId: 'p5_cr_cbd',
          coef: 2.5, credit: 5,
          matieres: [
            { tdId:'p5_cloud_td', dsId:'p5_cloud_ds', exId:'p5_cloud_ex', coef:1.5, moyId:'p5_m_cloud', crId:'p5_cr_cloud' },
            { tdId:'p5_bd_td',    dsId:'p5_bd_ds',    exId:'p5_bd_ex',    coef:1,   moyId:'p5_m_bd',    crId:'p5_cr_bd'    },
          ]
        },

        {
          label: 'Langue et Entreprenariat',
          moyId: 'p5_m_le', crId: 'p5_cr_le',
          coef: 3, credit: 6,
          matieres: [
            /* Préparation — avec TD */
            { tdId:'p5_prep_td', dsId:'p5_prep_ds', exId:'p5_prep_ex', coef:1, moyId:'p5_m_prep', crId:'p5_cr_prep' },
            /* Entreprenariat — sans TD */
            { dsId:'p5_entr_ds', exId:'p5_entr_ex', coef:1, moyId:'p5_m_entr', crId:'p5_cr_entr' },
            /* Anglais 5 — sans TD */
            { dsId:'p5_ang5_ds', exId:'p5_ang5_ex', coef:1, moyId:'p5_m_ang5', crId:'p5_cr_ang5' },
          ]
        },

        {
          label: 'Unité Optionnelle',
          moyId: 'p5_m_uo', crId: 'p5_cr_uo',
          coef: 3, credit: 6,
          matieres: [
            { tdId:'p5_esa_td', dsId:'p5_esa_ds', exId:'p5_esa_ex', coef:1.5, moyId:'p5_m_esa', crId:'p5_cr_esa' },
            { tdId:'p5_bpe_td', dsId:'p5_bpe_ds', exId:'p5_bpe_ex', coef:1.5, moyId:'p5_m_bpe', crId:'p5_cr_bpe' },
          ]
        },

      ]
    },

    /* ══════════════ SEMESTRE 6 ══════════════ */
    {
      label: 'Semestre 6',
      modules: [

        {
          label: "Projet de fin d'études",
          moyId: 'p6_m_pfe_mod', crId: 'p6_cr_pfe_mod',
          coef: 15, credit: 30,
          matieres: [
            /* PFE — examen (soutenance) uniquement */
            { exId:'p6_pfe_ex', coef:15, moyId:'p6_m_pfe', crId:'p6_cr_pfe' },
          ]
        },

      ]
    }

  ]
};


document.addEventListener('DOMContentLoaded', () => GradesEngine.init(L3_CONFIG, 'L3'));
// ============================================================
//  CONFIG L1 — Licence 1 Informatique  (Semestres 1 & 2)
// ============================================================

const L1_CONFIG = {
  semesters: [

    /* ══════════════ SEMESTRE 1 ══════════════ */
    {
      label: 'Semestre 1',
      modules: [

        {
          label: 'Logique et multimédia',
          moyId: 'p1_m_lm', crId: 'p1_cr_lm',
          coef: 3, credit: 6,
          matieres: [
            { tdId:'p1_lf_td',   dsId:'p1_lf_ds',   exId:'p1_lf_ex',   coef:1.5, moyId:'p1_m_lf',   crId:'p1_cr_lf'   },
            { tdId:'p1_tm_td',   dsId:'p1_tm_ds',   exId:'p1_tm_ex',   coef:1.5, moyId:'p1_m_tm',   crId:'p1_cr_tm'   },
          ]
        },

        {
          label: 'Mathématiques 1',
          moyId: 'p1_m_math1', crId: 'p1_cr_math1',
          coef: 3, credit: 6,
          matieres: [
            { tdId:'p1_alg1_td', dsId:'p1_alg1_ds', exId:'p1_alg1_ex', coef:1.5, moyId:'p1_m_alg1', crId:'p1_cr_alg1' },
            { tdId:'p1_ana1_td', dsId:'p1_ana1_ds', exId:'p1_ana1_ex', coef:1.5, moyId:'p1_m_ana1', crId:'p1_cr_ana1' },
          ]
        },

        {
          label: 'Unité transversale',
          moyId: 'p1_m_trans1', crId: 'p1_cr_trans1',
          coef: 2, credit: 4,
          matieres: [
            /* CC — pas de TD */
            { dsId:'p1_ang1_ds', exId:'p1_ang1_ex', coef:1, moyId:'p1_m_ang1', crId:'p1_cr_ang1' },
            { dsId:'p1_tc1_ds',  exId:'p1_tc1_ex',  coef:1, moyId:'p1_m_tc1',  crId:'p1_cr_tc1'  },
          ]
        },

        {
          label: 'Algorithmique et programmation 1',
          moyId: 'p1_m_ap1', crId: 'p1_cr_ap1',
          coef: 3.5, credit: 7,
          matieres: [
            { tdId:'p1_algo1_td', dsId:'p1_algo1_ds', exId:'p1_algo1_ex', coef:2,   moyId:'p1_m_algo1', crId:'p1_cr_algo1' },
            { tdId:'p1_atp1_td',  dsId:'p1_atp1_ds',  exId:'p1_atp1_ex',  coef:1.5, moyId:'p1_m_atp1',  crId:'p1_cr_atp1'  },
          ]
        },

        {
          label: "Systèmes d'exploitation et architecture",
          moyId: 'p1_m_sea', crId: 'p1_cr_sea',
          coef: 3.5, credit: 7,
          matieres: [
            { tdId:'p1_se1_td',  dsId:'p1_se1_ds',  exId:'p1_se1_ex',  coef:1.5, moyId:'p1_m_se1',  crId:'p1_cr_se1'  },
            { tdId:'p1_arch_td', dsId:'p1_arch_ds', exId:'p1_arch_ex', coef:2,   moyId:'p1_m_arch', crId:'p1_cr_arch' },
          ]
        },

      ]
    },

    /* ══════════════ SEMESTRE 2 ══════════════ */
    {
      label: 'Semestre 2',
      modules: [

        {
          label: 'Bases de données',
          moyId: 'p2_m_bdd', crId: 'p2_cr_bdd',
          coef: 2, credit: 4,
          matieres: [
            { tdId:'p2_fbd_td', dsId:'p2_fbd_ds', exId:'p2_fbd_ex', coef:2, moyId:'p2_m_fbd', crId:'p2_cr_fbd' },
          ]
        },

        {
          label: 'Mathématiques 2',
          moyId: 'p2_m_math2', crId: 'p2_cr_math2',
          coef: 3, credit: 6,
          matieres: [
            { tdId:'p2_alg2_td', dsId:'p2_alg2_ds', exId:'p2_alg2_ex', coef:1.5, moyId:'p2_m_alg2', crId:'p2_cr_alg2' },
            { tdId:'p2_ana2_td', dsId:'p2_ana2_ds', exId:'p2_ana2_ex', coef:1.5, moyId:'p2_m_ana2', crId:'p2_cr_ana2' },
          ]
        },

        {
          label: 'Algorithmique et programmation 2',
          moyId: 'p2_m_ap2', crId: 'p2_cr_ap2',
          coef: 3.5, credit: 7,
          matieres: [
            { tdId:'p2_algo2_td', dsId:'p2_algo2_ds', exId:'p2_algo2_ex', coef:1.5, moyId:'p2_m_algo2', crId:'p2_cr_algo2' },
            { tdId:'p2_atp2_td',  dsId:'p2_atp2_ds',  exId:'p2_atp2_ex',  coef:1,   moyId:'p2_m_atp2',  crId:'p2_cr_atp2'  },
            { tdId:'p2_py_td',    dsId:'p2_py_ds',    exId:'p2_py_ex',    coef:1,   moyId:'p2_m_py',    crId:'p2_cr_py'    },
          ]
        },

        {
          label: "Systèmes d'exploitation et réseaux",
          moyId: 'p2_m_ser', crId: 'p2_cr_ser',
          coef: 3.5, credit: 7,
          matieres: [
            { tdId:'p2_se2_td', dsId:'p2_se2_ds', exId:'p2_se2_ex', coef:1.5, moyId:'p2_m_se2', crId:'p2_cr_se2' },
            { tdId:'p2_res_td', dsId:'p2_res_ds', exId:'p2_res_ex', coef:2,   moyId:'p2_m_res', crId:'p2_cr_res' },
          ]
        },

        {
          label: 'Unité transversale',
          moyId: 'p2_m_trans2', crId: 'p2_cr_trans2',
          coef: 3, credit: 6,
          matieres: [
            /* CC — pas de TD */
            { dsId:'p2_ang2_ds', exId:'p2_ang2_ex', coef:1, moyId:'p2_m_ang2', crId:'p2_cr_ang2' },
            { dsId:'p2_tc2_ds',  exId:'p2_tc2_ex',  coef:1, moyId:'p2_m_tc2',  crId:'p2_cr_tc2'  },
            { dsId:'p2_ccn_ds',  exId:'p2_ccn_ex',  coef:1, moyId:'p2_m_ccn',  crId:'p2_cr_ccn'  },
          ]
        },

      ]
    }

  ]
};


document.addEventListener('DOMContentLoaded', () => GradesEngine.init(L1_CONFIG));
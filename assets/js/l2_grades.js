/**
 * Configuration L2 - ISIMM
 */
const L2_CONFIG = {
    semesters: [
        {
            label: 'Semestre 3',
            modules: [
                {
                    label: 'CPOO', moyId: 'p2_m_cpoo', crId: 'p2_cr_cpoo', coef: 3.5, credit: 7,
                    matieres: [
                        { label: 'UML', tdId:'p2_si_td', dsId:'p2_si_ds', exId:'p2_si_ex', coef:1.5, credit: 3, moyId:'p2_m_si', crId:'p2_cr_si' },
                        { label: 'Java', tdId:'p2_java_td', dsId:'p2_java_ds', exId:'p2_java_ex', coef:2, credit: 4, moyId:'p2_m_java', crId:'p2_cr_java', wTD: 0.2, wDS: 0.1 }
                    ]
                },
                {
                    label: 'Probabilité', moyId: 'p2_m_probabilite', crId: 'p2_cr_probabilite', coef: 2, credit: 4,
                    matieres: [{ label: 'Proba', tdId:'p2_proba_td', dsId:'p2_proba_ds', exId:'p2_proba_ex', coef:2, credit: 4, moyId:'p2_m_proba', crId:'p2_cr_proba' }]
                },
                {
                    label: 'Automate', moyId: 'p2_m_automate', crId: 'p2_cr_automate', coef: 2, credit: 4,
                    matieres: [
                        { label: 'TLA', tdId:'p2_tla_td', dsId:'p2_tla_ds', exId:'p2_tla_ex', coef:1, credit: 2, moyId:'p2_m_tla', crId:'p2_cr_tla' },
                        { label: 'Graphes', tdId:'p2_graph_td', dsId:'p2_graph_ds', exId:'p2_graph_ex', coef:1, credit: 2, moyId:'p2_m_graphe', crId:'p2_cr_graph' }
                    ]
                },
                {
                    label: 'Base de données', moyId: 'p2_m_basededonne', crId: 'p2_cr_basededonne', coef: 2.5, credit: 5,
                    matieres: [
                        { label: 'Ing BD', tdId:'p2_bd_td', dsId:'p2_bd_ds', exId:'p2_bd_ex', coef:1.5, credit: 3, moyId:'p2_m_base', crId:'p2_cr_bd', wTD: 0.2, wDS: 0.1 },
                        { label: 'Réseaux', tdId:'p2_res_td', dsId:'p2_res_ds', exId:'p2_res_ex', coef:1, credit: 2, moyId:'p2_m_reseau', crId:'p2_cr_reseau', wTD: 0.2, wDS: 0.1 }
                    ]
                },
                {
                    label: 'Langue et culture', moyId: 'p2_m_langue', crId: 'p2_cr_langue', coef: 2, credit: 4,
                    matieres: [
                        { label: 'Anglais', dsId:'p2_ang_ds', exId:'p2_ang_ex', coef:1, credit: 2, moyId:'p2_m_ang', crId:'p2_cr_ang' },
                        { label: 'Gestion', dsId:'p2_gest_ds', exId:'p2_gest_ex', coef:1, credit: 2, moyId:'p2_m_gestion', crId:'p2_cr_gestion' }
                    ]
                },
                {
                    label: 'UE Optionnelle', moyId: 'p2_m_uo', crId: 'p2_cr_uo', coef: 3, credit: 6,
                    matieres: [
                        { label: 'Ent. Sys', tdId:'p2_ent_td', dsId:'p2_ent_ds', exId:'p2_ent_ex', coef:1.5, credit: 3, moyId:'p2_m_ent', crId:'p2_cr_ent', wTD: 0.2, wDS: 0.1 },
                        { label: 'Modeling', tdId:'p2_sys_td', dsId:'p2_sys_ds', exId:'p2_sys_ex', coef:1.5, credit: 3, moyId:'p2_m_sys', crId:'p2_cr_sys', wTD: 0.2, wDS: 0.1 }
                    ]
                }
            ]
        },
        {
            label: 'Semestre 4',
            modules: [
                {
                    label: 'Bases de données', moyId: 'p4_m_bdd', crId: 'p4_cr_bdd', coef: 2, credit: 4,
                    matieres: [
                        { label: 'Admin BD', tdId:'p4_abd_td', dsId:'p4_abd_ds', exId:'p4_abd_ex', coef:1, credit: 2, moyId:'p4_m_abd', crId:'p4_cr_abd', wTD: 0.2, wDS: 0.1 },
                        { label: 'Entrepôts', tdId:'p4_edd_td', dsId:'p4_edd_ds', exId:'p4_edd_ex', coef:1, credit: 2, moyId:'p4_m_edd', crId:'p4_cr_edd', wTD: 0.2, wDS: 0.1 }
                    ]
                },
                {
                    label: 'Compilation & tests', moyId: 'p4_m_comp', crId: 'p4_cr_comp', coef: 2.5, credit: 5,
                    matieres: [
                        { label: 'Tests', tdId:'p4_tl_td', dsId:'p4_tl_ds', exId:'p4_tl_ex', coef:1, credit: 2, moyId:'p4_m_tl', crId:'p4_cr_tl', wTD: 0.2, wDS: 0.1 },
                        { label: 'Compil', tdId:'p4_tc_td', dsId:'p4_tc_ds', exId:'p4_tc_ex', coef:1.5, credit: 3, moyId:'p4_m_tc', crId:'p4_cr_tc', wTD: 0.2, wDS: 0.1 }
                    ]
                },
                {
                    label: 'Indexation et Web', moyId: 'p4_m_iw', crId: 'p4_cr_iw', coef: 2.5, credit: 5,
                    matieres: [
                        { label: 'Web', tdId:'p4_web_td', dsId:'p4_web_ds', exId:'p4_web_ex', coef:1.5, credit: 3, moyId:'p4_m_web', crId:'p4_cr_web', wTD: 0.2, wDS: 0.1 },
                        { label: 'Indexation', tdId:'p4_idx_td', dsId:'p4_idx_ds', exId:'p4_idx_ex', coef:1, credit: 2, moyId:'p4_m_idx', crId:'p4_cr_idx', wTD: 0.2, wDS: 0.1 }
                    ]
                },
                {
                    label: 'IA', moyId: 'p4_m_iai', crId: 'p4_cr_iai', coef: 2, credit: 4,
                    matieres: [{ label: 'IA', tdId:'p4_ia_td', dsId:'p4_ia_ds', exId:'p4_ia_ex', coef:2, credit: 4, moyId:'p4_m_ia', crId:'p4_cr_ia', wTD: 0.2, wDS: 0.1 }]
                },
                {
                    label: 'Langue & Ethique', moyId: 'p4_m_le', crId: 'p4_cr_le', coef: 3, credit: 6,
                    matieres: [
                        { label: 'Agile', tdId:'p4_agile_td', dsId:'p4_agile_ds', exId:'p4_agile_ex', coef:1, credit: 2, moyId:'p4_m_agile', crId:'p4_cr_agile', wTD: 0.2, wDS: 0.1 },
                        { label: 'Anglais 4', dsId:'p4_ang4_ds', exId:'p4_ang4_ex', coef:1, credit: 2, moyId:'p4_m_ang4', crId:'p4_cr_ang4' },
                        { label: 'Droit', dsId:'p4_droit_ds', exId:'p4_droit_ex', coef:1, credit: 2, moyId:'p4_m_droit', crId:'p4_cr_droit' }
                    ]
                },
                {
                    label: 'UO', moyId: 'p4_m_uo', crId: 'p4_cr_uo', coef: 3, credit: 6,
                    matieres: [
                        { label: 'BI', tdId:'p4_bi_td', dsId:'p4_bi_ds', exId:'p4_bi_ex', coef:1.5, credit: 3, moyId:'p4_m_bi', crId:'p4_cr_bi', wTD: 0.2, wDS: 0.1 },
                        { label: 'Digital', tdId:'p4_dbt_td', dsId:'p4_dbt_ds', exId:'p4_dbt_ex', coef:1.5, credit: 3, moyId:'p4_m_dbt', crId:'p4_cr_dbt', wTD: 0.2, wDS: 0.1 }
                    ]
                }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => GradesEngine.init(L2_CONFIG));
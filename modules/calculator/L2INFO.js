function calcMatiere(td,ds,ex){
    td=parseFloat(td)||0;
    ds=parseFloat(ds)||0;
    ex=parseFloat(ex)||0;

    return 0.1*td + 0.2*ds + 0.7*ex
}

function calculer(){
    //CPOO
    let si=calcMatiere(
        document.getElementById("si_td").value,
        document.getElementById("si_ds").value,
        document.getElementById("si_ex").value,
    )

      let java=calcMatiere(
        document.getElementById("java_ds").value,
        document.getElementById("java_td").value,
        document.getElementById("java_ex").value,
    )

    let moyCoop=(si*1.5+java*2)/3.5;



    //Proba
    let proba=calcMatiere(
        document.getElementById("proba_td").value,
        document.getElementById("proba_ds").value,
        document.getElementById("proba_ex").value,
    )

    let moyProba=proba;

    //Automate
    let tla=calcMatiere(
        document.getElementById("tla_td").value,
        document.getElementById("tla_ds").value,
        document.getElementById("tla_ex").value,
    )

      let graph=calcMatiere(
        document.getElementById("graph_ds").value,
        document.getElementById("graph_td").value,
        document.getElementById("graph_ex").value,
    )

    let moyAutomate=(tla+graph)/2;


    //Base de données
    let bd=calcMatiere(
        document.getElementById("bd_ds").value,
        document.getElementById("bd_td").value,
        document.getElementById("bd_ex").value,
    )

      let reseau=calcMatiere(
        document.getElementById("res_ds").value,
        document.getElementById("res_td").value,
        document.getElementById("res_ex").value,
    )

    let moyBase=(reseau+bd*1.5)/2.5;

    //UE Optionnelle
    let ent=calcMatiere(
        document.getElementById("ent_ds").value,
        document.getElementById("ent_td").value,
        document.getElementById("ent_ex").value,
    )

      let sys=calcMatiere(
        document.getElementById("sys_ds").value,
        document.getElementById("sys_td").value,
        document.getElementById("sys_ex").value,
    )

    let moyUO=(ent*1.5+sys*1.5)/3;

    //Langue et culture
    let ang=document.getElementById("ang_ds").value*0.2 + document.getElementById("ang_ex").value*0.8;

    let gestion=document.getElementById("gest_ds").value*0.2 + document.getElementById("gest_ex").value*0.8;

   

    let moyLangue=(ang+gestion)/2;

    //Moyenne
    let moyenne=(moyCoop*3.5 + moyProba*2 + moyAutomate*2 + moyBase*2.5 + moyLangue*2 + moyUO*3)/15;

    // afficher moyennes modules
    document.getElementById("m_cpoo").innerHTML = moyCoop.toFixed(2);
    document.getElementById("m_probabilité").innerHTML = moyProba.toFixed(2);
    document.getElementById("m_automate").innerHTML = moyAutomate.toFixed(2);
    document.getElementById("m_basededonne").innerHTML = moyBase.toFixed(2);
    document.getElementById("m_langue").innerHTML = moyLangue.toFixed(2);
    document.getElementById("m_uo").innerHTML = moyUO.toFixed(2);


    // afficher moyennes des matieres
    document.getElementById("m_si").innerHTML = si.toFixed(2);
    document.getElementById("m_java").innerHTML = java.toFixed(2);

    document.getElementById("m_proba").innerHTML = proba.toFixed(2);

    document.getElementById("m_tla").innerHTML = tla.toFixed(2);
    document.getElementById("m_graphe").innerHTML = graph.toFixed(2);

    document.getElementById("m_base").innerHTML = bd.toFixed(2);
    document.getElementById("m_reseau").innerHTML = reseau.toFixed(2);

    document.getElementById("m_ang").innerHTML = ang.toFixed(2);
    document.getElementById("m_gestion").innerHTML = gestion.toFixed(2);

    
    document.getElementById("m_ent").innerHTML = ent.toFixed(2);
    document.getElementById("m_sys").innerHTML = sys.toFixed(2);







    document.getElementById("moyenne").innerHTML ="Moyenne : " + moyenne.toFixed(2);

}
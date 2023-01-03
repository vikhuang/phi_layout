import React from "react";
import Editor from "./draft";

export const sampleContent =  'Quelle cause requiert une idée ? Ou dites-moi ce que c’est qu’idée ? c’est donc la chose pensée, en tant qu’elle est objectivement dans l’entendement. Mais qu’est-ce que qu’être objectivement dans l’entendement ? si je l’ai bien appris, c’est terminer à la façon d’un objet l’acte de l’entendement, ce qui n’est qu’une dénomination extérieure, et qui n’ajoute rien de réel à la chose. [...] Pourquoi donc recherche-je la cause d’une chose, qui actuellement n’est point, qui n’est qu’une simple dénomination et un pur néant ? [...] L’influence que donne une cause est réelle et actuelle ; ce qui actuellement n’est point, ne la peut pas recevoir, et partant ne peut pas dépendre ni procéder d’aucune véritable cause, tant s’en faut qu’il en requiert. Donc j’ai des idées, mais il n’y a point de causes de ces idées ; tant s’en faut qu’il y en ait une plus grande que moi et infinie. [...] Il y a ici de l’équivoque ; car si ce mot Rien est la même chose que n’être pas actuellement, en effet ce n’est rien, parce qu’elle n’est pas actuellement, et ainsi elle vient du néant, c’est à dire qu’elle n’a point de cause. Mais se ce mot Rien dit quelque chose de feint par l’esprit, qu’ils appellent vulgairement Être de raison, ce n’est pas un Rien mais quelque chose de réel, qui est conçue distinctement. Et néanmoins, parce qu’elle est seulement conçue, et qu’actuellement elle n’est pas, elle peut à la vérité être conçue'


export const Essay1 = (props) => {
    const onFocusedBoolean = (props.onFocused === 1);
    return(
        <div className='essay1'>
              <Editor essayNo='Essay Part1' onFocused={onFocusedBoolean}/>  
        </div>
    );
}

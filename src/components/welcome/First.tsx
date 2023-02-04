import { FunctionalComponent } from 'vue';
import s from "./Welcome.module.scss";
import save from "../../assets/icons/save.svg";

export const First: FunctionalComponent = () => {
    return <div class={s.card}>
            <svg>
                <use xlinkHref="#save"></use>
            </svg>
            <h2>会挣钱<br/>还要会省钱</h2>
        </div>
}

First.displayName = 'First'



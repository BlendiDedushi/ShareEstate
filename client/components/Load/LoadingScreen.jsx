import style from "./Loading.module.css"

export const LoadingScreen = () => {
    return (
        <div className={style.loadingscr}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </div>
    );
};
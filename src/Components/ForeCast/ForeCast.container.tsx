import { ForeCast } from "./ForeCast.component";

export const ForeCastContiner = (props) => {
    const { list } = props



    return (
        <>
            {
                list.length > 0 && <ForeCast {...props} />
            }
        </>
    )
}
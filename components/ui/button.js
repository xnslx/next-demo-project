import Link from 'next/link';
import classes from './button.module.css';

function Button(props) {
    if(props.link) {
       return(
            <Link href={props.link}>
                <a className="text-center leading-loose">{props.children}</a>
            </Link>
       ) 
    }
    return (
        <button onClick={props.onClick}>{props.children}</button>
    )
};

export default Button;
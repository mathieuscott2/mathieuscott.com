import{hasAccess}from"./auth";import{unlock}from"./actions";import Agenda from"./Agenda";import"./rafa.css";
export const metadata={title:"Rafa’s Agenda"};export const dynamic="force-dynamic";
export default async function Page(){if(!await hasAccess())return <main className="rafaLogin"><form action={unlock}><div className="rafaMark">R</div><h1>Rafa’s agenda</h1><p>Private family calendar</p><input name="password" type="password" placeholder="Shared password" required autoFocus/><button>Open agenda</button></form></main>;return <Agenda/>}

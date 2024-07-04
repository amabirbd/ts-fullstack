'use server'
 
import { revalidatePath, revalidateTag } from 'next/cache'
import RegisterForm from '../RegisterForm';


export default async function revalidate(tag: string) {
  console.log(tag);
  // revalidatePath(path);
  // return <RegisterForm revalidateTag={revalidateTag} />
  revalidateTag(tag)
  // router.refresh()
}
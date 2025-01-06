
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

function SearchBar({
    onChange,

}: {onChange : (search: string) => void}) {
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    onChange(searchValue)
    console.log(searchValue)
  }, [searchValue])

  return (
    <>  
     <div className='flex fixed z-50 top-7 left-1/3'>
         <div className='relative mx-auto w-[400px] inline-block text-center'>
            <MagnifyingGlassIcon className='absolute top-2 left-1.5' width={34} height={34} color={'black'}/>
            <Input type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search Dog Name' className=' py-6 pl-10 mb-8  text-3xl'/>
         </div>
     </div>
    </>
  )
}

export default SearchBar
export const SkeletonLoader = (props: { count?: number, className?: string, height?: number }) => {
    const { count = 3, className, height = 50 } = props;
  
    const loaders = () => {
      return (
        <>
          {
            Array.from({ length: count }, (a: number,b:any) => (
              <div key={`${a} ${b}`} className='animate-pulse bg-slate-200 rounded-md mt-2 w-full' style={{ height: `${height}px` }}></div>
            ))
          }
        </>)
    }
    return loaders()
  }


  export const Loader = () => {
    return (
      <>
        <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-whit rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    )
  }
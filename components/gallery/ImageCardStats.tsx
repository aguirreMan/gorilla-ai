import { useDeleteImage } from '@/hooks/useDeleteImage'
import { useDownloadImage } from '@/hooks/useDownloadImage'
import { useUser } from '@clerk/nextjs'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from '../ui/alert-dialog'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Loader2, Download, Trash2 } from 'lucide-react'

interface ImageCardStatsProps {
  image: SupabaseGenerationsData
}

export function ImageCardStats({image}: ImageCardStatsProps) {
  const { user } = useUser()
  const { mutate: deleteImage, isPending } = useDeleteImage(user?.id)
  const { downLoadImage, isDownLoading } = useDownloadImage()

  return (
    <Card className='flex flex-col gap-3'>
      <CardHeader>
        <CardTitle className='text-center text-primary text-3xl'>Image Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mt-2 flex flex-col justify-center'>
        <h2 className='font-bold mt-3  text-muted-foreground uppercase'>Prompt</h2>
          <p className='text-sm line-clamp-3'>{image.prompt}</p>
        </div>
        <div className='mt-3'>
          <h2 className='font-bold mb-2 uppercase'>Model</h2>
          <p className='text-sm'>{image.model}</p>
        </div>
        <div className='mt-3'>
          <h2 className='font-bold text-muted-foreground uppercase mt-3'>Size</h2>
          <p className='text-sm'>{image.size}</p>
        </div>
        <div>
            <h2 className='text-xs font-bold text-muted-foreground uppercase mt-3'>
                Created Time
            </h2>
            <p className='text-sm'>{image.created_at}</p>
        </div>
        {/*Actions go here */}
        <div className='mt-4 border-t flex flex-col gap-2 '>
          <Button onClick={() => downLoadImage(image.image_url, image.prompt)}
            variant='outline'
            className='w-full bg-primary mt-2 mb-2'
            disabled={isDownLoading}
          >
            {isDownLoading ? (
               <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            ) : (
                 <Download className='w-4 h-4 mr-2' />
            )}
            {isDownLoading ? 'Downloading' : 'Download'}
          </Button>
        </div>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='destructive' disabled={isPending} className='w-full bg-destructive'>
                    <Trash2 className='w-4 h-4' />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deleting your image cannot be undone and it will be permenantely gone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={() => deleteImage(image.id)}
                    >
                        {isPending ? 'Deleting Image' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

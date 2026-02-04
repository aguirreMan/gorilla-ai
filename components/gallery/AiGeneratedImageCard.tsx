import { SupabaseGenerationsData } from '@/types/supabaseTypes'
import { useDeleteImage } from '@/hooks/useDeleteImage'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Trash2, Download, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../ui/alert-dialog'
import { useDownloadImage } from '@/hooks/useDownloadImage'

interface AiGeneratedImageCardProps {
    image: SupabaseGenerationsData
}

export function AiGeneratedImageCard({ image }: AiGeneratedImageCardProps) {
    const { user } = useUser()
    const { mutate: deleteImage, isPending } = useDeleteImage(user?.id)
    const { downLoadImage, isDownLoading } = useDownloadImage()

    return (
        <Card className='overflow-hidden'>
            <CardContent className='flex flex-col md:flex-row gap-6 p-6'>
                {/**Image to render 80% on laptops/computers */}
                <div className='w-full md:w-4/5'>
                    <div className='relative w-full aspect-square'>
                        <Image
                            src={image.image_url}
                            alt={image.prompt}
                            fill
                            className='object-cover rounded-lg'
                            sizes='(max-width: 768px) 100vw, 80vw'
                        />
                    </div>
                </div>


                {/**Side panel 20% on dekstops */}
                <div className='w-full md:w-1/5 flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                            Prompt
                        </h3>
                        <p className='text-sm line-clamp-3'>{image.prompt}</p>
                    </div>
                    <div>
                        <h3 className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                            Model
                        </h3>
                        <p className='text-sm'>{image.model}</p>
                    </div>

                    <div>
                        <h3 className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                            Size
                        </h3>
                        <p className='text-sm'>{image.size}</p>
                    </div>

                    <div>
                        <h3 className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                            Created
                        </h3>
                        <p className='text-sm'>{image.created_at}</p>
                    </div>
                </div>

                {/**Action buttons delete download*/}
                <div className='mt-auto flex flex-col gap-2'>
                    <Button onClick={() => downLoadImage(image.image_url, image.prompt)}
                        variant='outline'
                        className='w-full'
                        disabled={isDownLoading}
                    >
                        {isDownLoading ? (
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        ) : (
                            <Download className='w-4 h-4 mr-2' />
                        )}
                        {isDownLoading ? 'Downloading' : 'Download'}
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant='destructive' disabled={isPending} className='w-full'>
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
                </div>
            </CardContent>
        </Card>
    )
}
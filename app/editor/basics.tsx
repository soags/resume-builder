import { PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export function meta() {
  return [{ title: '職務経歴書ビルダー' }, { name: 'description', content: '' }]
}

export default function Layout() {
  return (
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="name">名前</Label>
          <Input id="name" placeholder="曽我 周平" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="label">職種</Label>
          <Input id="label" placeholder="フルスタックエンジニア" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="github">GitHubアカウント</Label>
          <Input id="github" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="qiita">Qiitaアカウント</Label>
          <Input id="qiita" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="zenn">Zennアカウント</Label>
          <Input id="zenn" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="speakerDeck">SpeakerDeckアカウント</Label>
          <Input id="speakerDeck" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="slideShare">SlideShareアカウント</Label>
          <Input id="slideShare" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="other1">その他URL</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input id="other1" />
            <Button variant="outline" size="icon">
              <TrashIcon />
            </Button>
            <Button variant="outline" size="icon">
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className="mt-6 flex gap-8">
          <Button className="flex-1 bg-sky-800 hover:bg-sky-950">保存</Button>
          <Button className="flex-1" variant="outline">
            元に戻す
          </Button>
        </div>
      </div>
    </div>
  )
}

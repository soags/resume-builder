import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-xl">ログイン</CardTitle>
          <CardDescription>
            <p>TechfolioはIT技術者向けの職務経歴書制作/公開プラットフォームです。</p>
            <p> WebページとPDFを自動生成して、職務経歴書との格闘から解放されましょう。</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <GoogleLoginButton />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        ログインすることで、
        <a href="/terms" className="hover:text-primary underline underline-offset-4">
          利用規約
        </a>
        と
        <a href="/privacy" className="hover:text-primary underline underline-offset-4">
          プライバシーポリシー
        </a>
        に同意したことになります。
      </div>
    </div>
  );
}

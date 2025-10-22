"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState, useRef, useActionState } from "react";
import { parseStatement } from "@/lib/actions";
import type { StatementData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/file-upload";
import { StatementDisplay } from "@/components/statement-display";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const initialState: {
  data: StatementData | null;
  error: string | null;
} = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Parsing...
        </>
      ) : (
        "Parse Statement"
      )}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(parseStatement, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
      setShowResults(false);
    }
    if (state.data) {
      setShowResults(true);
    }
  }, [state, toast]);
  
  const handleReset = () => {
    setShowResults(false);
    formRef.current?.reset();
    setFile(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background">
      <div className="w-full max-w-4xl space-y-8">
        <header className="flex items-center justify-center">
          <Logo />
        </header>

        <div className="animate-in fade-in duration-500">
          {!showResults || !state.data ? (
            <form ref={formRef} action={formAction} className="space-y-6">
              <FileUpload file={file} setFile={setFile} disabled={pending} />
              <div className="flex justify-center">
                <SubmitButton />
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <StatementDisplay data={state.data} />
              <div className="flex justify-center">
                <Button onClick={handleReset} variant="outline">
                  Parse Another Statement
                </Button>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Statement Snatcher. All rights reserved.</p>
          <p className="mt-1">Upload a credit card statement PDF to extract key information.</p>
        </footer>
      </div>
    </main>
  );
}

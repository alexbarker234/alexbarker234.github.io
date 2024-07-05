import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import process from "process";

const isWatch = process.argv[2] === "watch";

await esbuild
    .build({
        entryPoints: ["./index.ts", "./index.scss"],
        bundle: true,
        outdir: "build",
        plugins: [sassPlugin()],
    })
    .then((result) => {
        console.log("Completed build");
        if (isWatch) {
            result.watch();
            console.log("Watching");
        }
    });

process.exit(0);

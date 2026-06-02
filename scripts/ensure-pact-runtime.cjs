const [major] = process.versions.node.split(".").map(Number);

if (Number.isNaN(major)) {
  console.error("Unable to detect Node.js version.");
  process.exit(1);
}

if (major >= 24) {
  console.error(
    [
      "Pact contract tests are not supported on Node.js 24 in this project.",
      `Detected Node.js ${process.versions.node}.`,
      "Use Node.js 22 LTS (recommended) or Node.js 20 to run `npm run test:contract`."
    ].join("\n")
  );
  process.exit(1);
}

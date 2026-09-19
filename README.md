# Wails v3 + SvelteKit + shadcn-svelte Template

A production-ready Wails v3 desktop application template powered by SvelteKit, shadcn-svelte, Tailwind CSS v4, and Bun.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Backend | Go + [Wails v3](https://v3.wails.io/) |
| Frontend | [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5 Runes) |
| UI Components | [shadcn-svelte](https://www.shadcn-svelte.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Package Manager | [Bun](https://bun.sh/) |
| Adapter | `@sveltejs/adapter-static` (SPA mode, output: `dist`) |

## 🚀 Quick Start

### Prerequisites

- [Go](https://go.dev/) 1.21+
- [Bun](https://bun.sh/)
- [Wails v3 CLI](https://v3.wails.io/getting-started/installation/)

### Option 1: Simple Mode (Recommended)

Use the project name as the Go module path. Zero manual changes needed.

```bash
wails3 init -n myapp -mod myapp -t github.com/nebula/wails-sveltekit-shadcn-ts
cd myapp
wails3 dev
```

This works because Wails generates bindings under `frontend/bindings/myapp/`, matching the template's default import path `$bindings/myapp`.

### Option 2: Full Module Path

If you need a fully qualified module path (e.g., for GitHub hosting):

```bash
wails3 init -n myapp -mod github.com/yourname/myapp -t github.com/nebula/wails-sveltekit-shadcn-ts
cd myapp
```

> **⚠️ Manual Step Required**: With a full module path, Wails generates bindings under `frontend/bindings/github.com/yourname/myapp/`. You must update the import in `frontend/src/routes/+page.svelte`:
>
> ```svelte
> // Before
> import { GreetService } from '$bindings/myapp';
>
> // After
> import { GreetService } from '$bindings/github.com/yourname/myapp';
> ```
>
> Then run `wails3 dev` to regenerate bindings. This is a one-time change.

### Why the Difference?

Wails v3 generates bindings using the **full Go import path** as the directory structure. This is by design, not a bug:

```
# -mod myapp
frontend/bindings/myapp/

# -mod github.com/yourname/myapp
frontend/bindings/github.com/yourname/myapp/
```

## 📁 Project Structure

```
myapp/
├── frontend/              # SvelteKit frontend (see frontend/README.md)
│   ├── src/
│   │   ├── lib/           # shadcn-svelte components, hooks, utils
│   │   └── routes/        # SvelteKit routes
│   ├── bindings/          # Auto-generated Wails TS bindings (do not edit)
│   └── dist/              # Frontend build output (embedded by Go)
├── main.go                # Go backend entry point
├── greetservice.go        # Example Go service callable from the frontend
├── Taskfile.yml           # Wails CLI task definitions
└── go.mod                 # Go module dependencies
```

## 🔗 Frontend ↔ Backend

Call Go methods from Svelte by importing the auto-generated binding:

```svelte
<script lang="ts">
  import { GreetService } from '$bindings/myapp';
  let result = $state('');

  async function handleClick() {
    result = await GreetService.Greet('Wails');
  }
</script>
```

For frontend development details (shadcn-svelte, Tailwind config, isolated dev server), see [`frontend/README.md`](./frontend/README.md).

## 📦 Building

```bash
wails3 build
```

The final executable will be placed in the `bin/` directory.

## 🎨 Customization

### App Icon

To replace the default Wails icon with your own:

1. Replace `build/appicon.png` with your 1024x1024 PNG file.
2. Run `wails3 task common:generate:icons` and `wails3 task common:update:build-assets`.
3. Rebuild the app with `wails3 build`.

For macOS users, please note that you may need to remove `build/darwin/Assets.car` or `build/appicon.icon` to force the system to use your new icon.

👉 **For detailed instructions, see [ICON_GUIDE.md](./ICON_GUIDE.md).**


## 🔗 TypeScript Bindings

Go services are exposed to the frontend as auto-generated TypeScript bindings in `frontend/bindings/`.

### Generation

Bindings are generated automatically by `wails3 dev` and `wails3 build`. The task is defined in the root `Taskfile.yml`:

```yaml
generate:bindings:
  cmds:
    - wails3 generate bindings -ts -f '{{.BUILD_FLAGS}}' -clean=true -time-type=Date
```

Key flags:
- `-ts`: Emit `.ts` files instead of `.js`
- `-clean=true`: Remove stale bindings before regenerating
- `-time-type=Date`: Map Go's `time.Time` to JS `Date`

## 📚 Resources

- [Wails v3 Documentation](https://v3.wails.io/)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [shadcn-svelte Documentation](https://www.shadcn-svelte.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
- [Wails Discord](https://discord.gg/JDdSxwjhGf) · [GitHub Discussions](https://github.com/wailsapp/wails/discussions)


## 📄 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

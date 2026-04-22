import fs from 'fs/promises';
import fetch from 'node-fetch';

const repos = [
    { name: 'future_plans', title: 'Future Plans' },
    { name: 'ir-blaster', title: 'IR Blaster' },
    { name: 'esp32-smart-display', title: 'Smart Display' },
    { name: 'esp32_media_player', title: 'HA Media Player' },
    { name: 'proxmoxbot', title: 'Telegram Proxmox Bot' }
];

const branch = 'master';

async function fetchReadme(repo) {
    const url = `https://raw.githubusercontent.com/Stashchenko/${repo}/${branch}/README.md`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${repo}`);
    }

    let content = await res.text();

    content = content.replace(
        /!\[(.*?)\]\(\.\/(.*?)\)/g,
        `![$1](https://raw.githubusercontent.com/Stashchenko/${repo}/${branch}/$2)`
    );

    content = content.replace(
        /!\[(.*?)\]\((?!http)(.*?)\)/g,
        `![$1](https://raw.githubusercontent.com/Stashchenko/${repo}/${branch}/$2)`
    );

    content = content.replace(
        /<img src="(?!http)(.*?)"/g,
        `<img src="https://raw.githubusercontent.com/Stashchenko/${repo}/${branch}/$1"`
    );

    return content;
}

async function main() {
    await fs.mkdir('./src/content/hobbies', { recursive: true });

    for (const repo of repos) {
        const content = await fetchReadme(repo.name);

        const file = `---
title: "${repo.title}"
github: "https://github.com/Stashchenko/${repo.name}"
---

${content}
`;

        await fs.writeFile(
            `./src/content/hobbies/${repo.name}.md`,
            file
        );

        console.log(`✔ Imported ${repo.name}`);
    }
}

main().then(() => console.log('All done!'));

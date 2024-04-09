'use client';
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classnames from 'classnames';
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'},
    ]
    const {status, data: session} = useSession();
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug/></Link>
                        <ul className="flex space-x-6">
                            {links.map((link) => {
                                return(
                                    <li key={link.href}>
                                        <Link
                                            className={classnames({
                                                'text-zinc-900': link.href === currentPath,
                                                'text-zinc-500': link.href !== currentPath,
                                                'hover:text-zinc-800 transition-colors': true,
                                            })}
                                            href={link.href}>{link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        src={session.user!.image!}
                                        fallback="?"
                                        size="2"
                                        radius="full"
                                        className="cursor-pointer"
                                        referrerPolicy="no-referrer"
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout" >Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            )}
                        {status === "unauthenticated" && (<Link href="/api/auth/signin" >Log In</Link>)}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}
export default NavBar;

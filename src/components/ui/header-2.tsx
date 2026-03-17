'use client';
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScroll } from './use-scroll';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const navigate = useNavigate();

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Contact', href: '/contact' },
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 50,
				pointerEvents: 'none',
				backgroundColor: 'transparent',
			}}
		>
			{/* Hamburger button — top-right of card */}
			<div style={{
				position: 'absolute',
				top: '28px',
				right: '28px',
				pointerEvents: 'auto',
			}}>
				<button
					style={{
						width: '52px',
						height: '52px',
						borderRadius: '50%',
						border: '1px solid rgba(255,255,255,0.15)',
						backgroundColor: 'rgba(255,255,255,0.06)',
						backdropFilter: 'blur(12px)',
						cursor: 'pointer',
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '5px',
						padding: 0,
						boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.3)',
					}}
					onClick={() => setOpen(!open)}
				>
					<span style={{ display: 'block', width: '16px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
					<span style={{ display: 'block', width: '16px', height: '2px', backgroundColor: 'white', borderRadius: '2px' }} />
				</button>
			</div>

			{/* Dropdown panel */}
			{open && (
				<div
					style={{
						position: 'fixed',
						top: '16px',
						left: '16px',
						right: '16px',
						backgroundColor: 'rgba(235,235,240,0.95)',
						backdropFilter: 'blur(32px)',
						WebkitBackdropFilter: 'blur(32px)',
						borderRadius: '28px',
						zIndex: 9999,
						overflow: 'hidden',
						boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Header row — X close only */}
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						padding: '16px 20px 12px',
						borderBottom: '1px solid rgba(0,0,0,0.07)',
					}}>
						<button
							onClick={() => setOpen(false)}
							style={{
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								padding: '4px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<X size={22} color="#0f172a" strokeWidth={2} />
						</button>
					</div>

					{/* Nav links */}
					<div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
						{links.map((link) => (
							<button
								key={link.label}
								style={{
									display: 'block',
									width: '100%',
									textAlign: 'left',
									padding: '18px 28px',
									color: '#475569',
									fontWeight: 400,
									fontSize: '22px',
									textDecoration: 'none',
									borderBottom: '1px solid rgba(0,0,0,0.06)',
									transition: 'color 0.15s ease',
									background: 'none',
									border: 'none',
									borderBottom: '1px solid rgba(0,0,0,0.06)',
									cursor: 'pointer',
								}}
								onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
								onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
								onClick={() => { setOpen(false); navigate(link.href); }}
							>
								{link.label}
							</button>
						))}
					</div>

					{/* CTA button */}
					<div style={{ padding: '16px 20px 20px' }}>
						<button
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								padding: '18px',
								borderRadius: '999px',
								backgroundColor: '#0f172a',
								color: 'white',
								fontWeight: 700,
								fontSize: '17px',
								border: 'none',
								cursor: 'pointer',
							}}
							onClick={() => { setOpen(false); navigate('/contact'); }}
						>
							Start a Project
						</button>
					</div>
				</div>
			)}
		</header>
	);
}

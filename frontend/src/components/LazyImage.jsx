import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt = "", className = "" }) => {
    const [inView, setInView] = useState(false);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, {
            root: null,  // default is the viewport
            threshold: 0.5, // percentage of target's visible area. Triggers "onIntersection"
        });

        if (placeholderRef.current) {
            observer.observe(placeholderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView) {
            console.log('Slika v vidnem polju');
        }
    }, [inView]);

    return (
        <img
            ref={!inView ? placeholderRef : null}
            src={inView ? src : "/images/favicon.svg"}
            alt={alt}
            className={className}
        />
    );
};

export default LazyImage;

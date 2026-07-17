interface BismillahHeaderProps {
  arabic: string
  english: string
}

/**
 * The Bismillah in Arabic + transliteration. Screen readers announce the
 * transliteration; the Arabic carries a lang attribute.
 */
export function BismillahHeader({ arabic, english }: BismillahHeaderProps) {
  return (
    <div className="bismillah">
      <p className="hero__bismillah" lang="ar">
        {arabic}
      </p>
      <p className="hero__bismillah-en">{english}</p>
    </div>
  )
}

export default BismillahHeader

# Fits public/couple.png into the 1200x630 social card WhatsApp/Twitter expect
# when the invitation link is shared -> public/og-preview.jpg.
#
# Why this exists rather than pointing og:image straight at couple.png:
#   - couple.png is ~3.2 MB; WhatsApp silently drops previews of that size.
#   - couple.png is 941x1672 (portrait); previews render landscape (~1.91:1),
#     so the raw file would be centre-cropped to a narrow band.
# The portrait is drawn whole, over a blurred zoomed copy of itself that fills
# the letterbox margins.
#
# Re-run after replacing the couple portrait:  powershell -File scripts\make-og.ps1
# Windows-only (GDI+). Keep output under ~300 KB or WhatsApp drops the preview.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src  = [System.Drawing.Image]::FromFile("$root\public\couple.png")
$out  = "$root\public\og-preview.jpg"

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# ---- background: same photo, cropped to fill, then blurred -------------------
# GDI+ has no Gaussian blur; downscaling to a few dozen pixels and scaling back
# up with bicubic interpolation is an effective stand-in.
$fillH = $src.Width * $H / $W                      # crop band matching 1200x630
$fillY = ($src.Height - $fillH) / 2
$tinyW = 32; $tinyH = [int]($tinyW * $H / $W)
$tiny = New-Object System.Drawing.Bitmap($tinyW, $tinyH)
$tg = [System.Drawing.Graphics]::FromImage($tiny)
$tg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$tg.DrawImage($src,
  (New-Object System.Drawing.Rectangle(0, 0, $tinyW, $tinyH)),
  (New-Object System.Drawing.Rectangle(0, [int]$fillY, $src.Width, [int]$fillH)),
  [System.Drawing.GraphicsUnit]::Pixel)
$tg.Dispose()

# Overscale the blur slightly so the bicubic edge clamp stays off-canvas.
$g.DrawImage($tiny, -20, -20, ($W + 40), ($H + 40))
$tiny.Dispose()

# Wash the background back so the sharp portrait stays the focal point.
$veil = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(120, 0xF8, 0xEE, 0xDC))
$g.FillRectangle($veil, 0, 0, $W, $H)

# ---- foreground: the full portrait, uncropped, centred ----------------------
$fgH = $H
$fgW = [int]($src.Width * $fgH / $src.Height)
$fgX = [int](($W - $fgW) / 2)
$g.DrawImage($src, $fgX, 0, $fgW, $fgH)

# Hairline gold edges where the portrait meets the blur.
$penGold = New-Object System.Drawing.Pen(
  [System.Drawing.Color]::FromArgb(150, 0xD8, 0xA7, 0x5B), 2)
$g.DrawLine($penGold, $fgX, 0, $fgX, $H)
$g.DrawLine($penGold, ($fgX + $fgW), 0, ($fgX + $fgW), $H)

# ---- encode as JPEG (photographic; PNG would blow the size budget) ----------
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
       Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 88)
$bmp.Save($out, $enc, $ep)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()
"Wrote $out  ({0} KB)" -f [math]::Round((Get-Item $out).Length / 1KB, 1)
